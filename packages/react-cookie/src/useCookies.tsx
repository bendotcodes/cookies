import { useContext, useLayoutEffect, useState, useRef, useMemo } from 'react';
import { Cookie, CookieSetOptions } from 'universal-cookie';
import CookiesContext from './CookiesContext';
import { isInBrowser } from './utils';

export default function useCookies<T extends string, U = { [K in T]?: any }>(
  dependencies?: T[],
): [
  U,
  (name: T, value: Cookie, options?: CookieSetOptions) => void,
  (name: T, options?: CookieSetOptions) => void,
  () => void,
] {
  const cookies = useContext(CookiesContext);
  if (!cookies) {
    throw new Error('Missing <CookiesProvider>');
  }

  const [allCookies, setCookies] = useState(() =>
    cookies.getAll({ doNotUpdate: true }),
  );

  if (isInBrowser()) {
    useLayoutEffect(() => {
      function onChange() {
        const newCookies = cookies.getAll({
          doNotUpdate: true,
        });

        if (shouldUpdate(dependencies || null, newCookies, allCookies)) {
          setCookies(newCookies);
        }
      }

      cookies.addChangeListener(onChange);

      return () => {
        cookies.removeChangeListener(onChange);
      };
    }, [cookies, allCookies]);
  }

  const setCookie = useMemo(() => cookies.set.bind(cookies), [cookies]);
  const removeCookie = useMemo(() => cookies.remove.bind(cookies), [cookies]);
  const updateCookies = useMemo(() => cookies.update.bind(cookies), [cookies]);

  return [allCookies, setCookie, removeCookie, updateCookies];
}

function shouldUpdate<U = { [K: string]: any }>(
  dependencies: Array<keyof U> | null,
  newCookies: U,
  oldCookies: U,
) {
  if (!dependencies) {
    return true;
  }

  for (let dependency of dependencies) {
    if (newCookies[dependency] !== oldCookies[dependency]) {
      return true;
    }
  }

  return false;
}
