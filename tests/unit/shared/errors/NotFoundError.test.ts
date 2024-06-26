import { HttpStatusCode } from "src/shared/enums/HttpStatusCodes";
import { NotFoundError } from "src/shared/errors/NotFoundError";

describe('NotFoundError', () => {
    it('should create an instance of NotFoundError correctly', () => {
        //Arrange
        const message = 'Invalid request error';
        //Act
        const notFoundError = new NotFoundError(message);
        //Assert
        expect(notFoundError).toBeInstanceOf(NotFoundError);
        expect(notFoundError.message).toBe(message);
        expect(notFoundError.statusCode).toBe(HttpStatusCode.NOT_FOUND);
    });
});