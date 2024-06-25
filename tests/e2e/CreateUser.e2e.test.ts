import 'reflect-metadata'
import request from 'supertest';
import { container } from 'tsyringe';
import { CreateUserService } from 'src/modules/services/CreateUserService';
import app from 'src/shared/infra/http/app';
import { dataSource } from 'src/shared/infra/typeorm/dataSource';

beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.runMigrations();
});

afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
});

describe('CreateUserController', () => {
    let createUserService: CreateUserService;

    beforeEach(() => {
        createUserService = container.resolve(CreateUserService);
    });

    it('should create a new user', async () => {

        const response = await request(app)
            .post('/user')
            .send({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
            });
        // console.log(response);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('johndoe@example.com');
    });

    it('should return an error if email is already taken', async () => {
        const response = await request(app)
            .post('/user')
            .send({
                name: 'Jane Doe',
                email: 'johndoe@example.com',
                password: '654321',
            });
        console.log(response);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email already taken');
    });
});
