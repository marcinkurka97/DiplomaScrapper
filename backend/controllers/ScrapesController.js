import db from "../lib/db";

const scrapes = {
  getData: async (req, res, next) => {
    // Get the scrape data
    const olxScrapes = db.get("olxScrape").value();

    // Respond with JSON
    res.json(olxScrapes);
  }
};

module.exports = scrapes;
