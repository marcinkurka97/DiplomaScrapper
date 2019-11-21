import React, { useState, useEffect } from "react";

export default function getMarkers({ props }) {
  const [backgroundColor, setBackgroundColor] = React.useState("inherit");
  const updateTimer = React.useRef(null);

  console.log(props);

  (function setUpdate() {
    setBackgroundColor("#9b34ee");
    updateTimer.current = setTimeout(() => {
      setBackgroundColor("inherit");
      updateTimer.current = null;
    }, 1000);
  })();

  const markers = [];
  props.offers.offers.olxScrape.map((offer, index) => {
    markers.push({
      id: index,
      title: "marker: " + index,
      lat: offer.lat,
      lng: offer.long
    });
  });

  return markers;
}
