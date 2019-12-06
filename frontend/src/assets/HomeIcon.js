import React from 'react';
import { theme } from '../theme/mainTheme';

function HomeIcon(props) {
  const { colorType } = props;
  // Different colors for different types of offers
  const colors =
    colorType === 'Mieszkania » Wynajem'
      ? theme.orange
      : colorType === 'Mieszkania » Sprzedaż'
      ? theme.green
      : colorType === 'Mieszkania » Zamiana'
      ? theme.blue
      : theme.blue;

  return (
    <svg height="50px" viewBox="0 0 512 512" width="50px" xmlns="http://www.w3.org/2000/svg">
      <g id="Layer_10" data-name="Layer 10" height="100%">
        <path
          d="m416 184.039v-.039a160 160 0 1 0 -319.727 10.166c.006.115.014.23.02.346.04.669.077 1.337.126 2.008a190.1 190.1 0 0 0 29.94 90.537l129.641 200.943 129.641-200.943a190.1 190.1 0 0 0 29.723-87.608q.686-7.626.636-15.41z"
          fill={colors}
        />
        <circle cx="256" cy="176" fill={colors} r="136" />
        <path d="m240 136.953h128v112h-128z" fill="#e4e4e2" />
        <path d="m240 248.953h-96v-112l48-48 48 48z" fill="#ebebeb" />
        <path d="m192 88.953h136l40 48h-128z" fill="#4799cf" />
        <path d="m208 176.95v72h-32v-72a16 16 0 1 1 32 0z" fill="#3775a4" />
        <path
          d="m200 176.95v72h-24v-72a16.021 16.021 0 0 1 12-15.5 16.015 16.015 0 0 1 12 15.5z"
          fill="#4799cf"
        />
        <path d="m280 168.953h32v32h-32z" fill="#3775a4" />
        <path d="m280 168.953h24v23.047h-24z" fill="#4799cf" />
        <g fill={colors} height="100%">
          <path d="m255.918 322.213a137.035 137.035 0 0 1 -93.361-36.724 8 8 0 1 1 10.886-11.724 121.279 121.279 0 0 0 165.106.015 8 8 0 0 1 10.9 11.711 136.242 136.242 0 0 1 -76.82 35.7 137.992 137.992 0 0 1 -16.711 1.022z" />
          <path d="m308.892 352a8 8 0 0 1 -6.714-12.338l5.162-8a8 8 0 1 1 13.443 8.674l-5.162 8a7.992 7.992 0 0 1 -6.729 3.664z" />
          <path d="m255.992 434a8 8 0 0 1 -6.715-12.338l37.416-57.995a8 8 0 0 1 13.446 8.674l-37.416 58a8 8 0 0 1 -6.731 3.659z" />
        </g>
        <path d="m374.146 131.832-40-48a8 8 0 0 0 -6.146-2.878h-136a7.976 7.976 0 0 0 -5.657 2.343l-48 48a8 8 0 0 0 -2.343 5.657v112a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8v-112a7.965 7.965 0 0 0 -1.856-5.121zm-23.226-2.878h-107.606l-32-32h112.939zm-198.92 11.314 40-40 40 40v100.686h-16v-64a24 24 0 0 0 -48 0v64h-16zm32 100.686v-64a8 8 0 0 1 16 0v64zm176 0h-112v-96h112z" />
        <path d="m280 208.954h32a8 8 0 0 0 8-8v-32a8 8 0 0 0 -8-8h-32a8 8 0 0 0 -8 8v32a8 8 0 0 0 8 8zm8-32h16v16h-16z" />
        <path d="m338.549 273.78a121.279 121.279 0 0 1 -165.106-.015 8 8 0 1 0 -10.886 11.724 137.277 137.277 0 0 0 186.894 0 8 8 0 0 0 -10.9-11.711z" />
        <path d="m424 183.879a170.61 170.61 0 0 0 -1.235-19.281c-11.227-91.953-95.153-157.637-187.121-146.407-87.8 10.718-152.53 88.221-147.358 176.446l.053.878c.031.532.063 1.064.1 1.531a198.557 198.557 0 0 0 31.2 94.348l129.64 200.943a8 8 0 0 0 13.446 0l129.64-200.943a198.7 198.7 0 0 0 30.968-91.227c.481-5.333.7-10.777.669-16.183-.002-.034-.002-.069-.002-.105zm-16 .16v.054c.033 4.892-.17 9.817-.61 14.706a182.7 182.7 0 0 1 -28.472 83.921l-122.918 190.523-122.918-190.523a182.6 182.6 0 0 1 -28.682-86.793c-.034-.454-.06-.907-.087-1.361l-.052-.869c-4.681-79.812 53.882-149.927 133.322-159.624a152.823 152.823 0 0 1 18.527-1.13c75.663 0 141.374 56.623 150.77 133.593a154.253 154.253 0 0 1 1.12 17.464z" />
        <path d="m318.4 329.278a8 8 0 0 0 -11.059 2.385l-5.162 8a8 8 0 1 0 13.443 8.674l5.162-8a8 8 0 0 0 -2.384-11.059z" />
        <path d="m297.753 361.278a8 8 0 0 0 -11.06 2.385l-37.416 58a8 8 0 1 0 13.446 8.674l37.416-57.995a8 8 0 0 0 -2.386-11.064z" />
      </g>
    </svg>
  );
}

export default HomeIcon;
