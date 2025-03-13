import { Cookies as UniversalCookies } from 'universal-cookie';
import { Request, Response } from 'express';

export interface AppRequest extends Request {
  universalCookies: UniversalCookies;
}

export interface CookieValues {
  name?: string;
  [key: string]: any;
}
