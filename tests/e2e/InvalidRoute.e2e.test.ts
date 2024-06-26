import 'reflect-metadata'
import request from 'supertest';
import app from 'src/shared/infra/http/app';
import { HttpStatusCode } from 'src/shared/enums/HttpStatusCodes';
import { ROUTE_DOES_NOT_EXIST } from 'src/shared/consts/ErrorMessagesConsts';

describe('Route Error Handling', () => {
    it('should return 404 for non-existent route', async () => {
        //Arrange
        const invalidRoute = '/nonexistent-route';
        const expectedErrorResponse = ROUTE_DOES_NOT_EXIST;
        //Act
        const response = await request(app).get(invalidRoute);
        //Assert
        expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
        expect(response.text).toContain(expectedErrorResponse);
    });
});