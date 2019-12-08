import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { theme as MainTheme } from '../../../theme/mainTheme';

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
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.body};
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
      }

      .offer__title {
        font-size: 16px;
      }

      .offer__desc {
        margin: 10px 0;
        font-size: 12px;
        display: flex;
        justify-content: flex-start;

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

      .offer__price {
        color: #1ec66c;
        width: 13%;
        justify-self: stretch;
        text-align: right;
        padding-right: 10px;
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

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
  }

  loadItems() {
    const { filteredHomeOffers, offers, handleSettingOffersState } = this.props;
    const offersArr = filteredHomeOffers.slice(0, offers.length + OFFERS_CHUNK);

    if (offers.length >= filteredHomeOffers.length) {
      this.setState({ hasMore: false });
    } else {
      handleSettingOffersState(offersArr);
    }
  }

  render() {
    const { offers, filteredHomeOffers, onMouseEnter, onMouseLeave } = this.props;
    const { hasMore } = this.state;
    return (
      <OffersWrapper id="listWrapper">
        <StyledInfiniteScroll
          dataLength={offers.length}
          next={this.loadItems.bind(this)} // eslint-disable-line react/jsx-no-bind
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
                <a
                  className="offer-container"
                  href={scrape.link}
                  id={scrape.id}
                  key={scrape.id}
                  onMouseEnter={() => onMouseEnter(scrape.id, scrape.lat, scrape.long)}
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
                    <p className="offer__price">{scrape.price}</p>
                  </div>
                </a>
              );
            })
          )}
        </StyledInfiniteScroll>
      </OffersWrapper>
    );
  }
}

export default List;
