import { Request, Response, NextFunction } from 'express';

export interface CustomError {
  statusCode?: number;
  name?: string;
  message?: string;
  errors?: { message: string }[];
  code?: number;
  keyValue?: string;
  value?: number;
}

export const ErrorHandlerMiddleware = (
  err: CustomError | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }
  const customError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something is wrong try again',
  };

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors || [])
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate values for ${Object.keys(
      err.keyValue || '',
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.message = `No items with: ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.message });
};