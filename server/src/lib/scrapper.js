const shortid = require("shortid");
const NodeGeocoder = require("node-geocoder");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Offer");
const Offer = mongoose.model("Offers");

import { getOlxOffersObj } from "./OLXScrapper";
import { getOtoDomOffersObj } from "./OtoDomScrapper";
import { getGratkaOffersObj } from "./GratkaScrapper";

// Options for Google Geocoding
var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "AIzaSyAF-_e-JJwREzFyL4GsSBDxoqCxMPptirg",
  formatter: null,
};

// Forcing loop pause for x time (Google Geocoding API can handle only 50 request/sec)
async function giveGeocodingSomeTime() {
  await timer(250);
}

function timer(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// CRON calls this function every x time (adding new values to database)
export async function runCron(req, res, next) {
  console.log("Scraping!");
  const offersPromise = [
    ...(await getOlxOffersObj()),
    ...(await getOtoDomOffersObj()),
    ...(await getGratkaOffersObj()),
  ];

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
    "gru",
  ];

  const geocoder = await NodeGeocoder(options);
  let counter = 0;

  const offersToAddToMongoDB = [];

  // Iterate though all the scraped data array
  for (let i = 0; i < offersPromise.length; i++) {
    /**
     * Every single offer calls Geocoding (for latitude and longitude)
     * But Google Geocoding API can handle only 50 request/sec
     * So when counter reaches 48 (48 Geocoding request)
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
      date:
        offersPromise[i].date && offersPromise[i].date.includes("dzisiaj")
          ? `${dt.getDate()}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`
          : offersPromise[i].date && offersPromise[i].date.includes("wczoraj")
          ? `${dt.getDate() - 1}-${
              monthNames[dt.getMonth()]
            }-${dt.getFullYear()}`
          : offersPromise[i].date,
      position: await geocoder
        .geocode(
          offersPromise[i].localization === "Katowice, Śródmieście"
            ? "Katowice, Dworzec"
            : offersPromise[i].localization
        )
        .then((res) => {
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
        .catch(function (err) {
          console.log(err);
        }),
    });

    counter++;
  }

  if (offersToAddToMongoDB.length !== 0) {
    Offer.collection.insertMany(offersToAddToMongoDB, function (err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
  }

  console.log("DONE!");
}

runCron();
