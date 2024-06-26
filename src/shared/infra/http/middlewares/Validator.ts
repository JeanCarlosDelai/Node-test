import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import { ValidationError } from 'src/shared/errors/ValidationError';

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
      const errorMessages = error.details.map(detail => detail.message);
      throw new ValidationError(errorMessages);
    } else {
      next();
    }
  };