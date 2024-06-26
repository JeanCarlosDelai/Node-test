import { Request, Response } from 'express';
import { ROUTE_DOES_NOT_EXIST } from 'src/shared/consts/ErrorMessagesConsts';
import { NotFound } from 'src/shared/infra/http/middlewares/NotFound';
import { vi } from 'vitest';

describe('notFound', () => {
    it('Should return status 404', () => {
        //Arrange
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };
        //Act
        NotFound(req as Request, res as Response);
        //Assert
        expect(res.status).toHaveBeenCalledWith(404);
    });

    it('Should send the message "Route does not exist"', () => {
        //Arrange
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };
        //Act
        NotFound(req as Request, res as Response);
        //Assert
        expect(res.send).toHaveBeenCalledWith(ROUTE_DOES_NOT_EXIST);
    });
});