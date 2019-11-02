import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

async function getOlxScrape(url) {
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
    console.log(nextPageNumber);
    if (nextPageNumber <= pageLimit) {
      const nextUrl = `https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
      return offersObj.concat(await getOlxScrape(nextUrl));
    } else {
      return offersObj;
    }
  }
}

async function getOffersObj() {
  const firstUrl =
    "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=1";
  const offersObj = await getOlxScrape(firstUrl);

  const jsonContent = JSON.stringify(offersObj, null, 2);

  fs.writeFile("offers.json", jsonContent, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });

  return offersObj;
}

export { getOlxScrape, getOffersObj };
