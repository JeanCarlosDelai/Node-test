import { HttpStatusCode } from "src/shared/enums/HttpStatusCodes";
import { BadRequestError } from "src/shared/errors/BadRequestError";

describe('BadRequestError', () => {
    it('should create an instance of BadRequestError correctly', () => {
        //Arrange
        const message = 'Invalid request error';
        //Act
        const badRequestError = new BadRequestError(message);
        //Assert
        expect(badRequestError).toBeInstanceOf(BadRequestError);
        expect(badRequestError.message).toEqual(message);
        expect(badRequestError.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    });
});