import { NotFoundError } from "src/shared/errors/NotFoundError";

describe('NotFoundError', () => {
    it('should create an instance of NotFoundError correctly', () => {
        const message = 'Invalid request error';
        const notFoundError = new NotFoundError(message);

        expect(notFoundError.message).toBe(message);
        expect(notFoundError.statusCode).toBe(404);
    });
});