import { HttpStatusCode } from "src/shared/enums/HttpStatusCodes";
import { ValidationError } from "src/shared/errors/ValidationError";

describe('BadRequestError', () => {
    it('should create an instance of BadRequestError correctly', () => {
        //Arrange
        const message = 'Invalid request error';
        //Act
        const badRequestError = new ValidationError(message);
        //Assert
        expect(badRequestError).toBeInstanceOf(ValidationError);
        expect(badRequestError.message).toBe(message);
        expect(badRequestError.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
    });
});