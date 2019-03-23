import { useCallback, useContext, useEffect, useRef, useState } from 'react';
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

  //we create new callback each time allCookies changes to avoid closure remembering old allCookies value
  const compareAndSetCbDeps = [cookies, allCookies];
  const compareAndSet = useCallback(
    (newCookies) => {
      if (shouldUpdate(dependencies || null, newCookies, allCookies)) {
        setCookies(cookies.getAll());
      }
    },
    compareAndSetCbDeps
  );

  //ref is necessary, because it can be mutated, which makes it's "current" value accessible to onChange function below
  const compareAndSetRef = useRef(compareAndSet);

  //setting new "current" value to ref, so onChange function below will always get latest compareAndSet callback
  useEffect(
    () => {
      compareAndSetRef.current = compareAndSet;
    },
    //it's important for useCallback above and this useEffect to share same dependencies,
    //because otherwise ref may not be updated and onChange function may read old "current"
    //value with callback's scope closed over old allCookies
    compareAndSetCbDeps
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
