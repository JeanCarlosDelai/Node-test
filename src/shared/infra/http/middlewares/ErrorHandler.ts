import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER, SOMETHING_WRONG } from 'src/shared/consts/ErrorConsts';
import { BadRequestError } from 'src/shared/errors/BadRequest.error';
import { NotFoundError } from 'src/shared/errors/notFound.error';

export interface CustomError {
  statusCode?: number;
  message?: string[];
  error?: string;
}

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
    message: err.msg || [SOMETHING_WRONG],
    error: err.error || INTERNAL_SERVER,
  };

  return res.status(customError.statusCode).json(customError);
};