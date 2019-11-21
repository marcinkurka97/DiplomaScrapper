import React, { useEffect, useState } from "react";
import MarkerClustererClass from "@google/markerclusterer";

export default function MarkerClusterer({ children, maps, map }) {
  const [cluster, setClusterer] = useState();

  useEffect(() => {
    const options = {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    };
    const cluster = new MarkerClustererClass(map, [], options);
    setClusterer(cluster);
  }, []);

  if (!cluster) return null;

  return React.Children.map(children, child => {
    return React.cloneElement(child, { map, maps, cluster });
  });
}
