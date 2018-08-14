import * as React from 'react';
import Cookies from 'universal-cookie';

export const { Provider, Consumer } = React.createContext(new Cookies());