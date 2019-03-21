import { useContext, useEffect, useState } from 'react';
import { Cookie, CookieSetOptions } from 'universal-cookie';
import CookiesContext from './CookiesContext';

export default function useCookies(): [
  { [name: string]: string },
  (name: string, value: Cookie, options?: CookieSetOptions) => void,
  (name: string, options?: CookieSetOptions) => void
] {
  const cookies = useContext(CookiesContext);
  if (!cookies) {
    throw new Error('Missing <CookiesProvider>');
  }

  const initialCookies = cookies.getAll();
  const [allCookies, setCookies] = useState(initialCookies);

  useEffect(
    () => {
      function onChange() {
        setCookies(cookies!.getAll());
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
