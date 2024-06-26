import 'reflect-metadata'
import request from 'supertest';
import { container } from 'tsyringe';
import { CreateUserService } from 'src/modules/services/CreateUserService';
import app from 'src/shared/infra/http/app';
import { dataSource } from 'src/shared/infra/typeorm/dataSource';
import { HttpStatusCode } from 'src/shared/enums/HttpStatusCodes';
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/ErrorMessagesConsts';
import { BAD_REQUEST, VALIDATION } from 'src/shared/consts/ErrorConsts';
import { CustomError } from 'src/shared/infra/http/middlewares/interfaces/CustomError.interface';

beforeAll(async () => {
    await dataSource.initialize();
});

beforeEach(async () => {
    await dataSource.runMigrations();
});

afterEach(async () => {
    await dataSource.dropDatabase();
});

afterAll(async () => {
    await dataSource.destroy();
});

describe('CreateUserController', () => {
    let createUserService: CreateUserService;

    beforeEach(() => {
        createUserService = container.resolve(CreateUserService);
    });

    it('should be possible to create a new user', async () => {
        //Arrange
        const createUser: CreateUserDTO = {
            name: 'teste',
            email: 'teste@gmail.com',
            password: 'teste@gmail.com',
        };
        //Act
        const response = await request(app)
            .post('/user')
            .send(createUser);
        //Assert
        expect(response.status).toBe(HttpStatusCode.OK);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(createUser.name);
        expect(response.body.email).toBe(createUser.email);
    });

    it('should return an error if email is already exists', async () => {
        //Arrange
        const createUser: CreateUserDTO = {
            name: 'teste',
            email: 'teste2@gmail.com',
            password: 'teste@gmail.com',
        };
        const expectedErrorResponse: CustomError = {
            error: BAD_REQUEST,
            message: EMAIL_ALREADY_USED,
            statusCode: HttpStatusCode.BAD_REQUEST,
        };
        await request(app)
            .post('/user')
            .send(createUser);
        //act
        const response = await request(app)
            .post('/user')
            .send(createUser);
        //Asert
        expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
        expect(response.body).toEqual(expectedErrorResponse);
    });

    it('should be possible to return an error if email is invalid', async () => {
        //Arrange
        const createUser: CreateUserDTO = {
            name: 'teste',
            email: 'teste2@.com',
            password: 'teste@gmail.com',
        };
        const expectedErrorResponse: CustomError = {
            error: VALIDATION,
            message: ["body.email must be a valid email"],
            statusCode: HttpStatusCode.BAD_REQUEST,
        };
        //act
        const response = await request(app)
            .post('/user')
            .send(createUser);
        //Asert
        expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
        expect(response.body).toEqual(expectedErrorResponse);
    });

    it('should be possible to return an error if name and email is null', async () => {
        //Arrange
        const createUser: CreateUserDTO = {
            name: '',
            email: '',
            password: 'teste@gmail.com',
        };
        const expectedErrorResponse: CustomError = {
            error: VALIDATION,
            message: [
                "body.name is not allowed to be empty",
                "body.email is not allowed to be empty"
            ],
            statusCode: HttpStatusCode.BAD_REQUEST,
        };
        //act
        const response = await request(app)
            .post('/user')
            .send(createUser);
        //Asert
        expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
        expect(response.body).toEqual(expectedErrorResponse);
    });
});
