import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { ValidationError } from 'src/shared/errors/ValidationError';
import Validator from 'src/shared/infra/http/middlewares/Validator';
import { vi } from 'vitest';

interface CustomRequest extends Request {
    name: string;
    age: string;
}

describe('Validator', () => {
    it('Must call the next() function if the request is valid', () => {
        //Arrange
        const schema: Schema = Joi.object({
            name: Joi.string().required(),
            age: Joi.string().required(),
        });
        const req: CustomRequest = {
            name: 'John',
            age: '153',
        } as CustomRequest;
        const res: Partial<Response> = {};
        const next: NextFunction = vi.fn() as unknown as NextFunction;
        const middleware = Validator(schema);
        //Act
        middleware(req as CustomRequest, res as Response, next);
        //Assert
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should throw a ValidationError if the request is invalid', () => {
        //Arrange
        const schema: Schema = Joi.object({
            name: Joi.string().required(),
            age: Joi.string().required(),
        });
        const req: Partial<Request> = {
            body: {
                name: 'John',
            },
        };
        const res: Partial<Response> = {};
        const middleware = Validator(schema);
        //Act & Assert
        expect(() =>
            middleware(req as Request, res as Response, vi.fn() as unknown as NextFunction),
        ).toThrow(ValidationError);
    });
});