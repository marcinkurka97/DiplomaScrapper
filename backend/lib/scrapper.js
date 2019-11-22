import axios from "axios";
import cheerio from "cheerio";
import db from "./db";
import shortid from "shortid";
import NodeGeocoder from "node-geocoder";

var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "AIzaSyAnkq6e5TAwYvqYd2ihCJvRt2Lk8rxOFtE",
  formatter: null
};

export async function getOlxScrape(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const offers = $("#offers_table .offer-wrapper");

  const pageLimiter = $("[data-cy='page-link-last']");
  const pageLimit = parseInt(pageLimiter.text().replace(/\s\s+/g, ""));

  const olxScrapes = await db.get("olxScrape").value();

  const dt = new Date();

  const offersObj = Array.from(offers).reduce((acc, el) => {
    const currentLink = $(el)
      .find('[data-cy="listing-ad-title"]')
      .attr("href");

    if (!olxScrapes.find(item => item.link === currentLink)) {
      return [
        ...acc,
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

  if (offersObj.length < 1) {
    return offersObj;
  } else {
    const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
    if (nextPageNumber <= 1) {
      const nextUrl = `https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
      return offersObj.concat(await getOlxScrape(nextUrl));
    } else {
      return offersObj;
    }
  }
}

export async function getOffersObj() {
  const firstUrl =
    "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=1";
  const offersObj = await getOlxScrape(firstUrl);

  return offersObj;
}

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

  offersPromise.map(async el => {
    db.get("olxScrape")
      .push({
        id: shortid.generate(),
        title: el.title,
        link: el.link,
        img: el.img,
        price: el.price,
        type: el.type,
        localization: el.localization,
        date: el.date.includes("dzisiaj")
          ? `${dt.getDate()}-${monthNames[dt.getMonth()]}-${dt.getFullYear()}`
          : el.date.includes("wczoraj")
          ? `${dt.getDate() - 1}-${
              monthNames[dt.getMonth()]
            }-${dt.getFullYear()}`
          : el.date,
        lat: await geocoder
          .geocode(
            el.localization === "Katowice, Śródmieście"
              ? "Katowice, Dworzec"
              : el.localization
          )
          .then(res => {
            let stringValue = res[0].latitude.toString();
            const tempToSwap = stringValue.substr(6);
            const rand = Math.floor(Math.random(parseInt(tempToSwap)) * 10000);
            stringValue = stringValue.substr(0, 6) + rand;
            return parseFloat(stringValue);
          })
          .catch(function(err) {
            console.log(err);
          }),
        long: await geocoder
          .geocode(
            el.localization === "Katowice, Śródmieście"
              ? "Katowice, Dworzec"
              : el.localization
          )
          .then(res => {
            let stringValue = res[0].longitude.toString();
            const tempToSwap = stringValue.substr(6);
            const rand = Math.floor(Math.random(parseInt(tempToSwap)) * 10000);
            stringValue = stringValue.substr(0, 6) + rand;
            return parseFloat(stringValue);
          })
          .catch(function(err) {
            console.log(err);
          })
      })
      .write();
  });

  console.log("DONE!");
}
