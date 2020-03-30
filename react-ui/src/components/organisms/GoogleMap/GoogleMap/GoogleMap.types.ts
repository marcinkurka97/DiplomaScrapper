export type GeolocationProps = {
  parentCallback: (childData: any) => void;
};

export type GoogleMapProps = {
  myLatLng: {
    lat: number;
    lng: number;
  };
};
