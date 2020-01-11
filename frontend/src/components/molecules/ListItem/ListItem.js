import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme as MainTheme } from '../../../theme/mainTheme';

const ListItem = ({ scrape, onMouseEnter, onMouseLeave, userID, addToFavourite }) => {
  return (
    <a
      className="offer-container"
      href={scrape.link}
      target="_blank"
      rel="noopener noreferrer"
      id={scrape.id}
      key={scrape.id}
      onMouseEnter={() => onMouseEnter(scrape.id, scrape.position.lat, scrape.position.lng)}
      onMouseLeave={() => onMouseLeave()}
    >
      <div className="offer">
        <div
          className="offer__border"
          style={{
            backgroundColor:
              scrape.type === 'Mieszkania » Wynajem' // eslint-disable-line no-nested-ternary
                ? MainTheme.orange
                : scrape.type === 'Mieszkania » Sprzedaż' // eslint-disable-line no-nested-ternary
                ? MainTheme.green
                : scrape.type === 'Mieszkania » Zamiana'
                ? MainTheme.blue
                : MainTheme.orange,
          }}
        />
        <div
          className="offer__img"
          style={{
            background:
              scrape.img !== undefined
                ? `url(${scrape.img})`
                : 'url(https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png)',
          }}
        />
        <div className="offers__desc-container">
          <h4 className="offer__title">{scrape.title}</h4>
          <div className="offer__desc">
            <p className="offer__localization">{scrape.localization}</p>
            <p className="offer__type">{scrape.type}</p>
            <p className="offer__date">{scrape.date}</p>
          </div>
        </div>
        <div className="offer__priceAndStar">
          {userID !== null && (
            <FontAwesomeIcon
              className="offer__star"
              icon={faStar}
              onClick={e => addToFavourite(e, scrape)}
            />
          )}
          {scrape.price}
        </div>
      </div>
    </a>
  );
};

export default ListItem;
