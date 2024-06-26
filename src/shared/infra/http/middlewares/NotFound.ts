import { Request, Response } from 'express';
import { ROUTE_DOES_NOT_EXIST } from 'src/shared/consts/ErrorMessagesConsts';
import { HttpStatusCode } from 'src/shared/enums/HttpStatusCodes';

export const NotFound = (_: Request, res: Response) =>
  res.status(HttpStatusCode.NOT_FOUND).send(ROUTE_DOES_NOT_EXIST);
