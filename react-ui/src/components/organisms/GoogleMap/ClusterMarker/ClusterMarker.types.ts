export type PointObject = {
  id: number;
  lat: number;
  lng: number;
  markerId: string;
  markerImg: string;
  markerTitle: string;
  markerPrice: string;
  markerLink: string;
  markerType: string;
};

export type ClusteMarkerProps = {
  points: Array<PointObject>;
  hoverState: boolean;
  hoverIdState: string;
};
