import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER, NOT_FOUND, SOMETHING_WRONG } from 'src/shared/consts/ErrorConsts';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { NotFoundError } from 'src/shared/errors/NotFoundError';
import { ErrorHandlerMiddleware } from 'src/shared/infra/http/middlewares/ErrorHandler';
import { vi } from 'vitest';

describe('ErrorHandlerMiddleware', () => {
    const createResponse = () => {
        const res: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        return res;
    };

    const createRequest = () => {
        const req: Partial<Request> = {};
        return req;
    };

    const createNext = () => {
        const next: NextFunction = vi.fn() as unknown as NextFunction;
        return next;
    };

    it('Should return status 500 and default message for unknown errors', () => {
        const err = {};
        const req = createRequest();
        const res = createResponse();
        const next = createNext();

        ErrorHandlerMiddleware(err as undefined, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 500,
            message: SOMETHING_WRONG,
            error: INTERNAL_SERVER,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('Should return status 400 and correct message for BadRequestError', () => {
        const err = new BadRequestError('Bad Request Error');
        const req = createRequest();
        const res = createResponse();
        const next = createNext();

        ErrorHandlerMiddleware(err, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 400,
            message: 'Bad Request Error',
            error: BAD_REQUEST,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('Should return status 404 and correct message for NotFoundError', () => {
        const err = new NotFoundError('Not Found Error');
        const req = createRequest();
        const res = createResponse();
        const next = createNext();

        ErrorHandlerMiddleware(err, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 404,
            message: 'Not Found Error',
            error: NOT_FOUND,
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('Should call next() when there is no error', () => {
        const err: undefined = undefined;
        const req = createRequest();
        const res = createResponse();
        const next = createNext();

        ErrorHandlerMiddleware(err, req as Request, res as Response, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });
});
