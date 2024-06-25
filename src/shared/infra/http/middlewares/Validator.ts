import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { BadRequestError } from 'src/shared/errors/BadRequestError';

export default (schema: Schema) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: ' ',
        },
      },
    });

    if (error) {
      throw new BadRequestError(error as any);
    } else {
      next();
    }
  };