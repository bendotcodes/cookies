interface IGetOptions {
  doNotParse?: boolean;
}

interface ISetOptions {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  path?: string;
  secure?: boolean;
}

export default class Cookies {
  public get(name: string, options?: IGetOptions): string;

  public getAll(options?: IGetOptions): { [key: string]: string };

  public set(name: string, value: string | object, options?: ISetOptions): void;

  public remove(name: string, options?: ISetOptions): any;
}
