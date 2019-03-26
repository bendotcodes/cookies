import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Cookie, CookieSetOptions } from 'universal-cookie';
import CookiesContext from './CookiesContext';

type Cookies = {[name: string]: Cookie};

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
  const [allCookies, setCookies] = useState<Cookies>(initialCookies);

  //ref is necessary, because it can be mutated, which makes it's latest "current" value always accessible to
  //onChange function below even if useEffect called only after first render
  const compareAndSetRef = useRef<(newCookies: Cookies) => void>(() => {});

  //we create new callback each time allCookies changes to avoid closure remembering old allCookies value
  compareAndSetRef.current = useCallback(
    (newCookies: Cookies) => {
      if (shouldUpdate(dependencies || null, newCookies, allCookies)) {
        setCookies(cookies.getAll());
      }
    },
    [cookies, allCookies]
  );

  useEffect(
    () => {
      function onChange() {
        const newCookies = cookies.getAll();

        compareAndSetRef.current(newCookies);
      }

      cookies.addChangeListener(onChange);

      return () => {
        cookies.removeChangeListener(onChange);
      };
    },
    [cookies]
  );

  return [allCookies, cookies.set.bind(cookies), cookies.remove.bind(cookies)];
}

function shouldUpdate(
  dependencies: string[] | null,
  newCookies: Cookies,
  oldCookies: Cookies
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
