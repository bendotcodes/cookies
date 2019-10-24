import * as React from 'react';
import Cookies from './Cookies';

const CookiesContext = React.createContext(new Cookies());

export const { Provider, Consumer } = CookiesContext;
export default CookiesContext;
