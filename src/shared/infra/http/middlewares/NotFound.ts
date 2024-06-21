import { Request, Response } from 'express';
import { ROUTE_DOES_NOT_EXIST } from 'src/shared/consts/ErrorConsts';

export const NotFound = (_: Request, res: Response) =>
  res.status(404).send(ROUTE_DOES_NOT_EXIST);
