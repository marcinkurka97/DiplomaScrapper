export const theme = {
  black: '#010203',
  light: '#F2F2F2',
  gray: '#F8F8F9',
  orange: '#F28D52',
  green: '#4E862A',
  blue: '#69BFA7',
  lightFont: 300,
  nomalFont: 400,
  semiBoldFont: 500,
  boldFont: 700,
  fontSize: {
    xxs: '1rem',
    xs: '1.2rem',
    s: '1.6rem',
    m: '2.1rem',
    l: '2.4rem',
    xl: '4rem',
  },
};

const themeLight = {
  backgroundGray: theme.light,
  backgroundDarkGray: '#dfe0df',
  backgroundOffer: '#fff',
  body: theme.black,
  bodyOffer: '#5a6371',
  orange: theme.orange,
  green: theme.green,
  blue: theme.blue,
  lightFont: 300,
  nomalFont: 400,
  semiBoldFont: 500,
  boldFont: 700,
  fontSize: theme.fontSize,
};

const themeDark = {
  backgroundGray: '#444',
  backgroundDarkGray: '#1F1F1F',
  backgroundOffer: '#1F1F1F',
  body: theme.light,
  bodyOffer: theme.light,
  orange: theme.orange,
  green: theme.green,
  blue: theme.blue,
  lightFont: 300,
  nomalFont: 400,
  semiBoldFont: 500,
  boldFont: 700,
  fontSize: theme.fontSize,
};

export const themeMode = mode => (mode === 'dark' ? themeDark : themeLight);
