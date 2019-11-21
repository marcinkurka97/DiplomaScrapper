import { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
import "./index.scss";
import GoogleMap from "./GoogleMap/GoogleMap";

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  return (
    <div className="App-wrapper">
      <div className="offers-wrapper">
        {scrapes.olxScrape.map(scrape => (
          <a
            className="offer-container"
            href={scrape.link}
            id={scrape.id}
            key={scrape.id}
          >
            <div className="offer">
              <div
                className="offer__img"
                style={{ background: `url(${scrape.img})` }}
              />
              <div className="offers__desc-container">
                <h4 className="offer__title">{scrape.title}</h4>
                <div className="offer__desc">
                  <p className="offer__localization">{scrape.localization}</p>
                  <p className="offer__type">{scrape.type}</p>
                  <p className="offer__date">{scrape.date}</p>
                </div>
              </div>
              <p className="offer__price">{scrape.price}</p>
            </div>
          </a>
        ))}
      </div>
      <GoogleMap />
    </div>
  );
}
