import { useContext, useEffect, useState, useRef, useMemo } from 'react';
import { Cookie, CookieSetOptions } from 'universal-cookie';
import CookiesContext from './CookiesContext';

export default function useCookies<T extends string, U = {[K in T]?: any}>(
  dependencies?: T[]
): [
  U,
  (name: T, value: Cookie, options?: CookieSetOptions) => void,
  (name: T, options?: CookieSetOptions) => void
] {
  const cookies = useContext(CookiesContext);
  if (!cookies) {
    throw new Error('Missing <CookiesProvider>');
  }

  const initialCookies = cookies.getAll();
  const [allCookies, setCookies] = useState(initialCookies);
  const previousCookiesRef = useRef(allCookies);

  useEffect(() => {
    function onChange() {
      const newCookies = cookies.getAll();

      if (
        shouldUpdate<T|null,U>(
          dependencies || null,
          newCookies,
          previousCookiesRef.current
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

  const setCookie = useMemo(() => cookies.set.bind(cookies), [cookies]);
  const removeCookie = useMemo(() => cookies.remove.bind(cookies), [cookies]);

  return [allCookies, setCookie, removeCookie];
}

function shouldUpdate<T extends string, U = {[K in T]?: any}>(
  dependencies: T[] | null,
  newCookies: U,
  oldCookies: U
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
