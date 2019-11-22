import express from "express";
import cors from "cors";
import { getOffersObj } from "./lib/scrapper";
import "./lib/cron";
import db from "./lib/db";

// Setup Express Server
const app = express();
app.use(cors());

app.get("/scrape", async (req, res, next) => {
  console.log("Scraping!");
  const offersPromise = await getOffersObj();
  res.json({ offersPromise });
});

app.get("/data", async (req, res, next) => {
  // Get the scrape data
  const olxScrapes = db.get("olxScrape").value();

  // Respond with JSON
  res.json(olxScrapes);
});

app.listen(2094, () =>
  console.log(`App running on port http://localhost:2094`)
);
