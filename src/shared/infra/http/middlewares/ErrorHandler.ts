import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER, SOMETHING_WRONG } from 'src/shared/consts/ErrorConsts';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { NotFoundError } from 'src/shared/errors/NotFoundError';
import { CustomError } from './interfaces/CustomError.interface';

export const ErrorHandlerMiddleware = (
  err: BadRequestError | NotFoundError | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return next();
  }
  const customError: CustomError = {
    statusCode: err.statusCode || 500,
    message: err.message || SOMETHING_WRONG,
    error: err.error || INTERNAL_SERVER,
  };

  return res.status(customError.statusCode).json(customError);
};