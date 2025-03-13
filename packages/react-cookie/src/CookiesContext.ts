import * as React from 'react';
import Cookies from './Cookies';

const CookiesContext = React.createContext<Cookies | null>(null);

export const { Provider, Consumer } = CookiesContext;
export default CookiesContext;
