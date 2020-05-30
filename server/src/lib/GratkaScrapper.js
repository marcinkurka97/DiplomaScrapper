const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
require("../models/Offer");
const Offer = mongoose.model("Offers");

// Starting point to scraping function
export async function getGratkaOffersObj() {
  const offersObj = await getGratkaScrape(
    "https://gratka.pl/nieruchomosci/mieszkania/katowice/?page=1"
  );
  return offersObj;
}

// Scraping function
export async function getGratkaScrape(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const offers = $(
    ".content__listingContainer .content__listing .teaserEstate"
  );

  // Get last page value
  const pageLimiter = $(".pagination")
    .children(".pagination__nextPage")
    .prev()
    .text();
  const pageLimit = parseInt(pageLimiter);

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

  // for (let i = 0; i < arrayFromScrapes.length; i++) {
  for (let i = 0; i < 1; i++) {
    const currentLink = $(arrayFromScrapes[i])
      .find(".teaserEstate__photo a")
      .attr("href");

    const price = $(arrayFromScrapes[i])
      .find(".teaserEstate__priceBox .teaserEstate__price")
      .text()
      .replace(/\s\s+/g, "")
      .replace(
        $(arrayFromScrapes[i])
          .find(
            ".teaserEstate__priceBox .teaserEstate__price .teaserEstate__additionalPrice"
          )
          .text()
          .replace(/\s\s+/g, ""),
        ""
      );

    if (currentLink !== lastScrapedOfferLink) {
      offersObj.push({
        title: $(arrayFromScrapes[i])
          .find(".teaserEstate__title .teaserEstate__anchor")
          .text()
          .replace(/\s\s+/g, ""),
        link: $(arrayFromScrapes[i])
          .find(".teaserEstate__photo a")
          .attr("href"),
        img: $(arrayFromScrapes[i])
          .find(".teaserEstate__photo a img")
          .attr("data-src"),
        price: price.replace("/mc", ""),
        type: price.includes("/mc")
          ? "Mieszkania » Wynajem"
          : price.includes("Zapytaj o cenę")
          ? "Mieszkania » Zamiana"
          : "Mieszkania » Sprzedaż",
        localization: $(arrayFromScrapes[i])
          .find(".teaserEstate__mainInfo .teaserEstate__localization")
          .text()
          .replace(/\s\s+/g, ""),
        date: $(arrayFromScrapes[i])
          .find(".teaserEstate__details .teaserEstate__info")
          .text()
          .replace(/^\s+|\s+$/g, "")
          .replace("Aktualizacja: ", "")
          .substr(0, 10),
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
      const nextUrl = `https://gratka.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
      // Concat new values to offersObj array
      return [...offersObj, ...(await getGratkaScrape(nextUrl))];
    } else {
      return offersObj;
    }
  }
}
