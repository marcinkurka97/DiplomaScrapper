const axios = require("axios");
const cheerio = require("cheerio");
const shortid = require("shortid");
const NodeGeocoder = require("node-geocoder");

const express = require("express");
const router = express.Router();

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

  // Get all the values from database
  // const olxScrapes = await db.get("olxScrape").value();

  const dt = new Date();

  // Add only new offers to offersObj Array
  const offersObj = Array.from(offers).reduce((acc, el) => {
    // Get current element link value
    const currentLink = $(el)
      .find('[data-cy="listing-ad-title"]')
      .attr("href");

    /**
     * Check if this link is already present in databse,
     * if it is not, then we can add this value,
     * otherwise skip it
     */
    //
    if (!olxScrapes.find(item => item.link === currentLink)) {
      return [
        ...acc,
        // Scraping specific fields and formatting it
        {
          title: $(el)
            .find('[data-cy="listing-ad-title"]')
            .text()
            .replace(/\s\s+/g, ""),
          link: $(el)
            .find('[data-cy="listing-ad-title"]')
            .attr("href"),
          img: $(el)
            .find("img")
            .attr("src"),
          price: $(el)
            .find(".td-price strong")
            .text(),
          type: $(el)
            .find(".title-cell p small")
            .text()
            .replace(/\s\s+/g, ""),
          localization: $(el)
            .find("[data-icon='location-filled']")
            .parent()
            .text()
            .replace(/\s\s+/g, ""),
          date: `${$(el)
            .find("[data-icon='clock']")
            .parent()
            .text()
            .replace(/^\s+|\s+$/g, "")
            .replace("  ", "-")}-${dt.getFullYear()}`
        }
      ];
    }
    return acc;
  }, []);

  // Recursive iteration through all pages the get all the data
  if (offersObj.length < 1) {
    return offersObj;
  } else {
    // Regex which creates next page number from current url
    const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
    // If we didnt reach last page
    if (nextPageNumber <= 3) {
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

    router.post("/offers/addOffer", function(req, res) {
      res.send("About this wiki");
    });

    // Push new value to databse
    // db.get("olxScrape")
    //   .push({
    //     id: shortid.generate(),
    //     title: offersPromise[i].title,
    //     link: offersPromise[i].link,
    //     img: offersPromise[i].img,
    //     price: offersPromise[i].price,
    //     type: offersPromise[i].type,
    //     localization: offersPromise[i].localization,
    //     date: offersPromise[i].date.includes("dzisiaj")
    //       ? `${dt.getDate()}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`
    //       : offersPromise[i].date.includes("wczoraj")
    //       ? `${dt.getDate() - 1}-${
    //           monthNames[dt.getMonth()]
    //         }-${dt.getFullYear()}`
    //       : offersPromise[i].date,
    //     position: await geocoder
    //       .geocode(
    //         offersPromise[i].localization === "Katowice, Śródmieście"
    //           ? "Katowice, Dworzec"
    //           : offersPromise[i].localization
    //       )
    //       .then(res => {
    //         let lat = res[0].latitude.toString();
    //         let lng = res[0].longitude.toString();

    //         const latToSwap = lat.substr(5);
    //         const lngToSwap = lng.substr(5);

    //         const randLat = Math.floor(
    //           Math.random(parseInt(latToSwap)) * 10000
    //         );
    //         const randLng = Math.floor(
    //           Math.random(parseInt(lngToSwap)) * 10000
    //         );

    //         lat = lat.substr(0, 5) + randLat;
    //         lng = lng.substr(0, 5) + randLng;

    //         return { lat: parseFloat(lat), lng: parseFloat(lng) };
    //       })
    //       .catch(function(err) {
    //         console.log(err);
    //       })
    //   })
    //   .write();
    counter++;
  }

  console.log("DONE!");
}

// runCron();
