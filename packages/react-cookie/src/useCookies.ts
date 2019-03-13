import Cookies from 'universal-cookie';
import * as React from 'react';

import CookieContext from './CookiesContext';
import { ReactCookieProps } from './types';

// Only way to make function modules work with both TypeScript and Rollup
const hoistStatics = require('hoist-non-react-statics');

const useCookies = () => {
  const cookies = React.useContext(CookieContext);
  const savedCookies = React.useRef();

  const onChange = () => {
    console.log('Change');
  };

  const unlisten = (c?: Cookies) => {
    (c || cookies).removeChangeListener(onChange);
  };

  const listen = () => {
    cookies.addChangeListener(onChange);

    // @ts-ignore
    savedCookies.current = cookies;
  };

  React.useEffect(() => {
    listen();
  }, []);

  React.useEffect(() => {
    if (savedCookies.current && savedCookies.current !== cookies) {
      unlisten(savedCookies.current);
      listen();
    }
  });

  return cookies;
};

export default useCookies;
