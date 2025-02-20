export interface IApiResponseSuccess<T> {
  data: T;
  message: string;
  statusCode: number;
  error: null;
}

export interface IApiResponseReject {
  data: null;
  message: string;
  statusCode: number;
  error: null;
}
