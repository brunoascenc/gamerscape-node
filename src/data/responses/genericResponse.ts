export type SuccessResponse<T> = {
  success: boolean;
  data: T;
};

export type ErrorResponse = {
  success: boolean;
  message: string;
};

export enum errorCode {
  invalidRequest = 400,
  unauthorized = 401,
  notFound = 404,
  internalError = 500,
  conflict = 409,
  forbidden = 403,
  unprocessableEntity = 422,
  tooManyRequests = 429,
  serviceUnavailable = 503,
  gatewayTimeout = 504,
  badGateway = 502,
  notImplemented = 501,
  payloadTooLarge = 413
};