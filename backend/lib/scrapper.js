import axios from "axios";
import cheerio from "cheerio";
import db from "./db";
import shortid from "shortid";

export async function getOlxScrape(url) {
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const offers = $("#offers_table .offer-wrapper");
  const pageLimiter = $("[data-cy='page-link-last']");
  const pageLimit = parseInt(pageLimiter.text().replace(/\s\s+/g, ""));

  const offersObj = Array.from(offers).map(el => ({
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
    date: $(el)
      .find("[data-icon='clock']")
      .parent()
      .text()
      .replace(/\s\s+/g, "")
  }));

  if (offersObj.length < 1) {
    return offersObj;
  } else {
    const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
    if (nextPageNumber <= pageLimit) {
      const nextUrl = `https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
      return offersObj.concat(await getOlxScrape(nextUrl));
    } else {
      return offersObj;
    }
  }
}

export async function getOffersObj() {
  const firstUrl =
    "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=30";
  const offersObj = await getOlxScrape(firstUrl);

  return offersObj;
}

export async function runCron() {
  console.log("Scraping!");
  const offersPromise = await getOffersObj();

  db.set("olxScrape", []).write();

  offersPromise.map(el => {
    db.get("olxScrape")
      .push({
        id: shortid.generate(),
        title: el.title,
        link: el.link,
        img: el.img,
        price: el.price,
        type: el.type,
        localization: el.localization,
        date: el.date
      })
      .write();
  });

  console.log("DONE!");
}
