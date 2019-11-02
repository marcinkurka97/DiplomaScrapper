import express from "express";
import { getOffersObj } from "./lib/scrapper";
import db from "./lib/db";
import "./lib/cron";

// Setup Express Server
const app = express();

app.get("/scrape", async (req, res, next) => {
  console.log("Scraping!");
  const offersPromise = await getOffersObj();
  res.json({ offersPromise });
});

app.listen(2093, () => console.log(`App running on port 2093`));
