import { getOffersObj } from "./lib/scrapper";
import express from "express";

const app = express();
app.get("/scrape", async (req, res, next) => {
  console.log("Scraping!");
  const offersPromise = await getOffersObj();
  res.json({ offersPromise });
});

app.listen(2093, () => console.log(`App running on port 2093`));
