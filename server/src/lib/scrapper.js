const axios = require("axios");
const cheerio = require("cheerio");
const shortid = require("shortid");
const NodeGeocoder = require("node-geocoder");
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
require("../models/Offer");

const Offer = mongoose.model("Offers");

// Options for Google Geocoding
var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "AIzaSyAF-_e-JJwREzFyL4GsSBDxoqCxMPptirg",
  formatter: null
};

// Scraping function
export async function getOlxScrape(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const offers = $("#offers_table .offer-wrapper");

  // Get last page value
  const pageLimiter = $("[data-cy='page-link-last']");
  const pageLimit = parseInt(pageLimiter.text().replace(/\s\s+/g, ""));

  const dt = new Date();

  let offersFromMongoDB;

  try {
    offersFromMongoDB = await Offer.find()
      .sort({ scrapeDate: -1 })
      .exec();
  } catch (error) {
    console.log(error);
  }

  const lastScrapedOfferLink =
    offersFromMongoDB.length !== 0
      ? offersFromMongoDB[offersFromMongoDB.length - 1].link
      : "";

  // Add only new offers to offersObj Array
  const arrayFromScrapes = Array.from(offers);
  const offersObj = [];

  for (let i = 0; i < arrayFromScrapes.length; i++) {
    const currentLink = $(arrayFromScrapes[i])
      .find('[data-cy="listing-ad-title"]')
      .attr("href");

    if (currentLink !== lastScrapedOfferLink) {
      offersObj.push({
        title: $(arrayFromScrapes[i])
          .find('[data-cy="listing-ad-title"]')
          .text()
          .replace(/\s\s+/g, ""),
        link: $(arrayFromScrapes[i])
          .find('[data-cy="listing-ad-title"]')
          .attr("href"),
        img: $(arrayFromScrapes[i])
          .find("img")
          .attr("src"),
        price: $(arrayFromScrapes[i])
          .find(".td-price strong")
          .text(),
        type: $(arrayFromScrapes[i])
          .find(".title-cell p small")
          .text()
          .replace(/\s\s+/g, ""),
        localization: $(arrayFromScrapes[i])
          .find("[data-icon='location-filled']")
          .parent()
          .text()
          .replace(/\s\s+/g, ""),
        date: `${$(arrayFromScrapes[i])
          .find("[data-icon='clock']")
          .parent()
          .text()
          .replace(/^\s+|\s+$/g, "")
          .replace("  ", "-")}-${dt.getFullYear()}`
      });
    } else {
      break;
    }
  }

  // Recursive iteration through all pages the get all the data
  if (offersObj.length < 1) {
    return offersObj;
  } else {
    // Regex which creates next page number from current url
    const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
    // If we didnt reach last page
    if (nextPageNumber <= 10) {
      const nextUrl = `https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
      // Concat new values to offersObj array
      return offersObj.concat(await getOlxScrape(nextUrl));
    } else {
      return offersObj;
    }
  }
}

// Forcing loop pause for x time (Google Geocoding API can handle only 50 request/sec)
async function giveGeocodingSomeTime() {
  await timer(250);
}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Starting point to scraping function
export async function getOffersObj() {
  const firstUrl =
    "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=1";
  const offersObj = await getOlxScrape(firstUrl);

  return offersObj;
}

// CRON calls this function every x time (adding new values to database)
export async function runCron(req, res, next) {
  console.log("Scraping!");
  const offersPromise = await getOffersObj();

  const dt = new Date();
  const monthNames = [
    "sty",
    "lut",
    "mar",
    "kwi",
    "maj",
    "cze",
    "lip",
    "sie",
    "wrz",
    "paź",
    "lis",
    "gru"
  ];

  const geocoder = await NodeGeocoder(options);
  let counter = 0;

  const offersToAddToMongoDB = [];

  // Iterate though all the scraped data array
  for (let i = 0; i < offersPromise.length; i++) {
    /**
     * Every single offer calls Geocoding twice (for latitude and longitude)
     * But Google Geocoding API can handle only 50 request/sec
     * So when counter reaches 24 (48 Geocoding request)
     * We force loop to wait some time
     */
    if (counter >= 48) {
      counter = 0;
      await giveGeocodingSomeTime();
    }

    // Push new value to databse
    offersToAddToMongoDB.push({
      id: shortid.generate(),
      title: offersPromise[i].title,
      link: offersPromise[i].link,
      img: offersPromise[i].img,
      price: offersPromise[i].price,
      type: offersPromise[i].type,
      localization: offersPromise[i].localization,
      scrapeDate: new Date(),
      date: offersPromise[i].date.includes("dzisiaj")
        ? `${dt.getDate()}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`
        : offersPromise[i].date.includes("wczoraj")
        ? `${dt.getDate() - 1}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`
        : offersPromise[i].date,
      position: await geocoder
        .geocode(
          offersPromise[i].localization === "Katowice, Śródmieście"
            ? "Katowice, Dworzec"
            : offersPromise[i].localization
        )
        .then(res => {
          let lat = res[0].latitude.toString();
          let lng = res[0].longitude.toString();

          const latToSwap = lat.substr(5);
          const lngToSwap = lng.substr(5);

          const randLat = Math.floor(Math.random(parseInt(latToSwap)) * 10000);
          const randLng = Math.floor(Math.random(parseInt(lngToSwap)) * 10000);

          lat = lat.substr(0, 5) + randLat;
          lng = lng.substr(0, 5) + randLng;

          return { lat: parseFloat(lat), lng: parseFloat(lng) };
        })
        .catch(function(err) {
          console.log(err);
        })
    });

    counter++;
  }

  if (offersToAddToMongoDB.length !== 0) {
    Offer.collection.insertMany(offersToAddToMongoDB, function(err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
  }

  console.log("DONE!");
}

// runCron();
