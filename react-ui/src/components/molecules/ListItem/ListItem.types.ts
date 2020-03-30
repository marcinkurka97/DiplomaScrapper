export type ListItemProps = {
  scrape: {
    position: { lat: number; lng: number };
    _id: string;
    id: string;
    title: string;
    link: string;
    img: string;
    price: string;
    type: string;
    localization: string;
    scrapeDate: string;
    date: string;
  };
  onMouseEnter?: (id: string, lat: number, lng: number) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  userID: number | null;
  addToFavourite?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};
