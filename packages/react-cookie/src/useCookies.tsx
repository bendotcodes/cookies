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

  const initialCookies = cookies.getAll();
  const [allCookies, setCookies] = useState(initialCookies);
  const previousCookiesRef = useRef(allCookies);

  if (isInBrowser()) {
    useLayoutEffect(() => {
      function onChange() {
        const newCookies = cookies.getAll();

        if (
          shouldUpdate(
            dependencies || null,
            newCookies,
            previousCookiesRef.current,
          )
        ) {
          setCookies(newCookies);
        }

        previousCookiesRef.current = newCookies;
      }

      cookies.addChangeListener(onChange);

      return () => {
        cookies.removeChangeListener(onChange);
      };
    }, [cookies]);
  }

  const setCookie = useMemo(() => cookies.set.bind(cookies), [cookies]);
  const removeCookie = useMemo(() => cookies.remove.bind(cookies), [cookies]);

  return [allCookies, setCookie, removeCookie, cookies.update];
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
