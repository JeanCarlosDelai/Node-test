import { Request, Response } from 'express';
import { ROUTE_DOES_NOT_EXIST } from 'src/shared/consts/ErrorMessagesConsts';
import { NotFound } from 'src/shared/infra/http/middlewares/NotFound';
import { vi } from 'vitest';

describe('notFound', () => {
    it('Should return status 404', () => {
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        NotFound(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('Should send the message "Route does not exist"', () => {
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };

        NotFound(req as Request, res as Response);

        expect(res.send).toHaveBeenCalledWith(ROUTE_DOES_NOT_EXIST);
    });
});