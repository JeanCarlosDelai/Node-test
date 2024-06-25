import 'reflect-metadata'
import { Request, Response } from 'express';
import { CreateUserController } from 'src/modules/infra/http/controllers/CreateUserController';
import { container } from 'tsyringe';
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { UserRespondeDTO } from 'src/modules/domain/dtos/UserReponse.dto';
import { IUsersRepository } from 'src/modules/domain/interfaces/UserRepository.interfece';
import { UsersRepository } from 'src/modules/infra/typeorm/repositories/implementation/UsersRepository';
import { vi } from 'vitest';
import { CreateUserService } from 'src/modules/services/CreateUserService';

describe('Create User Controller', () => {
    const userController = new CreateUserController();

    beforeAll(() => {
        container.register<IUsersRepository>('UsersRepository', {
            useClass: UsersRepository,
        })
    });

    it('should create a new user successfully', async () => {
        // Arrange
        const createUser: CreateUserDTO = {
            name: 'Jean teste',
            email: 'teste@gmail.com',
            password: 'teste@gmail.com',
        }
        const createUserRequest = {
            body: createUser,
        } as Request;
        const expectedResponse: UserRespondeDTO = {
            id: '1',
            name: 'Jean teste',
            email: 'teste@gmail.com',
        };
        const specificMockResponse = {
            json: vi.fn().mockResolvedValueOnce(expectedResponse),
        } as unknown as Response;
        vi.spyOn(CreateUserService.prototype, 'execute')
            .mockResolvedValueOnce(expectedResponse);
        //Act
        const response = await userController.execute(createUserRequest, specificMockResponse);
        // Assert
        expect(response).toEqual(expectedResponse)
    });
});