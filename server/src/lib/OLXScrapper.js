const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
require("../models/Offer");
const Offer = mongoose.model("Offers");

// Starting point to scraping function
export async function getOlxOffersObj() {
  const offersObj = await getOlxScrape(
    "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=1"
  );
  return offersObj;
}

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
        img: $(arrayFromScrapes[i]).find("img").attr("src"),
        price: $(arrayFromScrapes[i]).find(".td-price strong").text(),
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
          .replace("  ", "-")}-${dt.getFullYear()}`,
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
      const nextUrl = `https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
      // Concat new values to offersObj array
      return [...offersObj, ...(await getOlxScrape(nextUrl))];
    } else {
      return offersObj;
    }
  }
}
