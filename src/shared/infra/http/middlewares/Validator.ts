import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { BadRequestError } from 'src/shared/errors/BadRequest.error';

export default (schema: Schema) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: '',
        },
      },
    });

    if (error) {
      const validationErrors = error.details.map((detail) => (detail.message));
      throw new BadRequestError(validationErrors);
    } else {
      next();
    }
  };