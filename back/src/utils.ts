export class CustomError extends Error {
  constructor(public status: number = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export const wrapAsync = (fn) => (req, res, next) =>
  fn(req, res, next).catch(next);

export declare interface ResponseData {
  success: boolean;
  message: string;
  data: any;
}
