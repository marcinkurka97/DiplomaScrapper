export type StyledButtonProps = {
  theme: {
    orange: string;
    green: string;
    blue: string;
    backgroundGray: string;
    backgroundDarkGray: string;
    body: string;
    boldFont: number;
    normalFont: number;
  };
  active?: boolean;
  rent?: boolean;
  sell?: boolean;
  swap?: boolean;
};

export type FilterBarProps = {
  currentActiveType: string;
  filterByType: (offerType: string) => Promise<void>;
  priceChange: any;
  mapsApiLoaded: boolean;
  mapInstance: any;
  mapsapi: any;
  filterByDistance: (
    mapsapi: any,
    radius: number,
    pinCenter: { lat: () => number; lng: () => number },
  ) => Promise<void>;
  handleDurationChange: (value: string) => void;
  setDarkMode: (value: boolean) => void;
};
