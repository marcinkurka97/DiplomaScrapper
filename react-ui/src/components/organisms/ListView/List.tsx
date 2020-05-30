import React, { useState } from 'react';
import { connect } from 'react-redux';
import ListItem from '../../molecules/ListItem/ListItem';
import { OffersWrapper, StyledInfiniteScroll, NoOffers } from './List.style';
import { ListProps } from './List.types';

const OFFERS_CHUNK = 20;

const List: React.FC<ListProps> = ({
  offers,
  filteredHomeOffers,
  onMouseEnter,
  onMouseLeave,
  userID,
  handleSettingOffersState,
}) => {
  const [hasMore, setHasMore] = useState(true);

  const loadItems = () => {
    const offersArr = filteredHomeOffers.slice(0, offers.length + OFFERS_CHUNK);

    if (offers.length >= filteredHomeOffers.length) {
      setHasMore(false);
    } else {
      handleSettingOffersState(offersArr);
    }
  };

  const addToFavourite = (star: any) => {
    star.target.style.color = '#F28D52';
  };

  return (
    <OffersWrapper id="listWrapper" userID={userID}>
      <StyledInfiniteScroll
        dataLength={offers.length}
        next={loadItems} // eslint-disable-line react/jsx-no-bind
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="listWrapper"
      >
        {filteredHomeOffers.length === 1 && filteredHomeOffers[0] === 0 ? (
          <NoOffers>
            <span>
              Brak ofert
              <span role="img" aria-label="emoji">
                😔
              </span>
            </span>

            <p>
              Nie udało nam się znaleźć ofert, które odpowiadałyby Twoim oczekiwaniom. Spróbuj
              zmienić kryteria wyszukiwania.
            </p>
          </NoOffers>
        ) : (
          filteredHomeOffers.map((scrape: any) => {
            return (
              <ListItem
                key={scrape.id}
                scrape={scrape}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                userID={userID}
                addToFavourite={addToFavourite}
              />
            );
          })
        )}
      </StyledInfiniteScroll>
    </OffersWrapper>
  );
};

const mapStateToProps = (state: any) => {
  const { userID } = state;
  return { userID };
};

export default connect(mapStateToProps)(List);
