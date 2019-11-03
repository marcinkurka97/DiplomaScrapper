import { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
import "./index.scss";

export default function Data() {
  const { scrapes } = useContext(ScrapeContext);

  console.log(scrapes);
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
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163404.43961140903!2d18.867110072402557!3d50.21358819181318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0xb9af2a350559fabb!2sKatowice!5e0!3m2!1spl!2spl!4v1572781004971!5m2!1spl!2spl"
        frameborder="0"
        allowfullscreen=""
        className="google-map"
      ></iframe>
    </div>
  );
}
