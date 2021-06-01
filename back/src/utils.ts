import { validateOrReject, ValidationError } from 'class-validator';

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

export const createModelAndValidation = async (classModel, data) => {
  try {
    const instance = new classModel();
    Object.keys(data).map((param) => (instance[param] = data[param]));
    await validateOrReject(instance);
  } catch (error) {
    if (error[0] instanceof ValidationError) {
      error.forEach((ele) => {
        Object.keys(ele.constraints).map((key) => {
          throw new CustomError(403, `${ele.constraints[key]}`);
        });
      });
    } else {
      throw error;
    }
  }
};
