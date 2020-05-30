const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
require("../models/Offer");
const Offer = mongoose.model("Offers");

// Starting point to scraping function
export async function getOtoDomOffersObj() {
  const rentOffersObj = await getOtoDomScrape(
    "https://www.otodom.pl/wynajem/mieszkanie/katowice/?page=1"
  );
  const buyOffersObj = await getOtoDomScrape(
    "https://www.otodom.pl/sprzedaz/mieszkanie/katowice/?page=1"
  );
  return [...rentOffersObj, ...buyOffersObj];
}

// Scraping function
export async function getOtoDomScrape(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const offers = $(".section-listing__row-content .offer-item");

  // Get last page value
  const pageLimiter = $(".pager").children(".pager-next").prev().text();
  const pageLimit = parseInt(pageLimiter);

  // Get offer type
  const offerType = $(".query-text .query-text-h1").text().includes("sprzedaż")
    ? "sprzedaz"
    : "wynajem";

  const dt = new Date();

  let offersFromMongoDB;

  try {
    offersFromMongoDB = await Offer.find().sort({ scrapeDate: -1 }).exec();
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
    const currentLink = $(arrayFromScrapes[i]).attr("data-url");

    if (currentLink !== lastScrapedOfferLink) {
      offersObj.push({
        title: $(arrayFromScrapes[i])
          .find(".offer-item-title")
          .text()
          .replace(/\s\s+/g, ""),
        link: $(arrayFromScrapes[i]).attr("data-url"),
        img: $(arrayFromScrapes[i]).find(".img-cover").img,
        price: $(arrayFromScrapes[i])
          .find(".offer-item-price")
          .text()
          .replace(/\s\s+/g, "")
          .replace("/mc", ""),
        type:
          $(arrayFromScrapes[i]).find(".text-nowrap .hidden-xs").text() ===
          "Mieszkanie na wynajem: "
            ? "Mieszkania » Wynajem"
            : "Mieszkania » Sprzedaż",
        localization: $(arrayFromScrapes[i])
          .find(".offer-item-header p.text-nowrap")
          .text()
          .replace(/\s\s+/g, "")
          .replace(
            $(arrayFromScrapes[i]).find(".text-nowrap .hidden-xs").text(),
            ""
          ),
        date: null,
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
    if (nextPageNumber <= 2) {
      const nextUrl = `https://www.otodom.pl/${offerType}/mieszkanie/katowice/?page=${nextPageNumber}`;
      // Concat new values to offersObj array
      return [...offersObj, ...(await getOtoDomScrape(nextUrl))];
    } else {
      return offersObj;
    }
  }
}
