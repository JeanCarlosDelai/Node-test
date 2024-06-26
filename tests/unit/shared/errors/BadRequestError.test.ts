import { HttpStatusCode } from "src/shared/enums/HttpStatusCodes";
import { BadRequestError } from "src/shared/errors/BadRequestError";

describe('BadRequestError', () => {
    it('should create an instance of BadRequestError correctly', () => {
        const message = 'Invalid request error';
        const badRequestError = new BadRequestError(message);

        expect(badRequestError.message).toBe(message);
        expect(badRequestError.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    });
});