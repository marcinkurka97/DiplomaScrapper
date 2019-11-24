import { useContext, useEffect, useState } from "react";
import { ScrapeContext } from "./ScrapeContext";
import "./index.scss";
import GoogleMap from "./GoogleMap/GoogleMap/Geolocation";
import List from "./ListView/List";
import styled from "styled-components";

const ListAndMapWrapper = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f8f8f8;
`;

const OFFERS_CHUNK = 20;

export default function OffersListAndMap() {
  const { scrapes } = useContext(ScrapeContext);

  const [hover, setHover] = useState(false);
  const [hoverId, setHoverId] = useState("");
  const [geolocation, setGeolocation] = useState({});
  const [center, setCenter] = useState(geolocation);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (offers.length === 0) {
      setOffers(scrapes.olxScrape.slice(0, OFFERS_CHUNK));
    }
  });

  const handleSettingOffersState = offers => {
    setOffers(offers);
  };

  const callbackSettingGeolocation = childData => {
    setGeolocation(childData);
  };

  const onMouseEnterHandler = (objId, objLat, objLng) => {
    if (!hover) {
      setHover(true);
      setHoverId(objId);
      setCenter({ lat: objLat, lng: objLng });
    }
  };

  const onMouseLeaveHandler = () => {
    if (hover) {
      setHover(false);
      setHoverId("");
    }
  };

  return offers.length > 0 ? (
    <ListAndMapWrapper>
      <List
        scrapes={scrapes}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        offers={offers}
        handleSettingOffersState={handleSettingOffersState}
      />
      <GoogleMap
        scrapes={offers}
        hoverState={hover}
        hoverIdState={hoverId}
        center={center}
        parentCallback={callbackSettingGeolocation}
      />
    </ListAndMapWrapper>
  ) : (
    <span>Loading</span>
  );
}
