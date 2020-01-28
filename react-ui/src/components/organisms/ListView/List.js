import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import ListItem from '../../molecules/ListItem/ListItem';

const slideInBottom = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const OffersWrapper = styled.div`
  height: 100%;
  width: 50%;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 12px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundDarkGray};
    transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.sliderHandle};
    transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }

  .offer-container {
    text-decoration: none;
    color: ${({ theme }) => theme.bodyOffer};
    overflow-y: auto;

    .offer {
      width: 97.5%;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 10px 10px 10px;
      border-radius: 6px;
      background: ${({ theme }) => theme.backgroundOffer};
      transition: background 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
      animation: ${slideInBottom} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

      &:hover {
        transform: scale(1.0125);
        transition: box-shadow, transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 7px 0 rgba(0, 0, 0, 0.06);
      }

      &__border {
        height: 100%;
        width: 7px;
        border-radius: 6px 0 0 6px;
      }

      &__img {
        flex: 0 0 20%;
        width: 20%;
        height: 100%;
        background-size: cover !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
        margin: 0 10px 0 7px;
      }

      .offers__desc-container {
        width: 65%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }

      .offer__title {
        font-size: 16px;
        margin: 0;
      }

      .offer__desc {
        margin: 0;
        font-size: 12px;
        display: flex;
        justify-content: flex-start;
        align-self: flex-start;

        .offer__localization {
          margin: 0 10px 0 0;
        }

        .offer__type {
          margin: 0 10px 0 0;
        }

        .offer__date {
          margin: 0 10px 0 0;
        }
      }

      .offer__priceAndStar {
        color: #1ec66c;
        width: 13%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: ${({ userID }) => (userID !== null ? 'space-between' : 'center')};
        text-align: left;
        padding-right: 20px;
        margin: 0;

        svg {
          color: ${({ theme }) => theme.sliderHandle};
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

          &:hover {
            transform: scale(1.25);
            color: ${({ theme }) => theme.orange};
          }
        }
      }
    }
  }

  .infinite-scroll-component__outerdiv {
    height: 100%;

    .infinite-scroll-component {
      overflow: initial !important;
    }
  }
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  height: 100% !important;
  width: 100%;
`;

const NoOffers = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;

  p {
    font-size: 14px;
  }
`;

const OFFERS_CHUNK = 20;

const List = ({
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

  const addToFavourite = star => {
    star.target.style.color = '#F28D52';
  };

  return (
    <OffersWrapper id="listWrapper" userID={userID}>
      <StyledInfiniteScroll
        dataLength={offers.length}
        next={loadItems.bind(this)} // eslint-disable-line react/jsx-no-bind
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
          filteredHomeOffers.map(scrape => {
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

const mapStateToProps = state => {
  const { userID } = state;
  return { userID };
};

export default connect(mapStateToProps)(List);
