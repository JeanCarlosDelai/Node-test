import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER } from 'src/shared/consts/ErrorConsts';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { NotFoundError } from 'src/shared/errors/NotFoundError';
import { CustomError } from './interfaces/CustomError.interface';
import { SOMETHING_WRONG } from 'src/shared/consts/ErrorMessagesConsts';
import { HttpStatusCode } from 'src/shared/enums/HttpStatusCodes';

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
    statusCode: err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: err.message || SOMETHING_WRONG,
    error: err.error || INTERNAL_SERVER,
  };

  return res.status(customError.statusCode).json(customError);
};