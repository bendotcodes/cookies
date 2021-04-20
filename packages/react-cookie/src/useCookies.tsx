import { useContext, useLayoutEffect, useState, useRef, useMemo } from 'react';
import { Cookie, CookieSetOptions } from 'universal-cookie';
import CookiesContext from './CookiesContext';

export default function useCookies(
  dependencies?: string[]
): [
  { [name: string]: any },
  (name: string, value: Cookie, options?: CookieSetOptions) => void,
  (name: string, options?: CookieSetOptions) => void
] {
  const cookies = useContext(CookiesContext);
  if (!cookies) {
    throw new Error('Missing <CookiesProvider>');
  }

  const initialCookies = cookies.getAll();
  const [allCookies, setCookies] = useState(initialCookies);
  const previousCookiesRef = useRef(allCookies);

  useLayoutEffect(() => {
    function onChange() {
      const newCookies = cookies.getAll();

      if (
        shouldUpdate(
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

function shouldUpdate(
  dependencies: string[] | null,
  newCookies: { [name: string]: any },
  oldCookies: { [name: string]: any }
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
