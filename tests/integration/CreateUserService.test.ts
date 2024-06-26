import 'reflect-metadata'
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { IUsersRepository } from 'src/modules/domain/interfaces/UserRepository.interfece';
import { UsersRepositoryInMemory } from 'src/modules/infra/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserService } from 'src/modules/services/CreateUserService';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/ErrorMessagesConsts';
import { BadRequestError } from 'src/shared/errors/BadRequestError';

let createUserService: CreateUserService;
let usersRepository: IUsersRepository;

beforeAll(() => {
  usersRepository = new UsersRepositoryInMemory();
  createUserService = new CreateUserService(usersRepository);
});

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    //Arrange
    const createUser: CreateUserDTO = {
      name: 'Jean teste',
      email: 'teste@gmail.com',
      password: 'teste@gmail.com',
    };
    //Act
    const user = await createUserService.execute(createUser);
    //Assert
    expect(user).toHaveProperty('id')
    expect(user.name).toEqual(createUser.name)
    expect(user.email).toEqual(createUser.email)
  });

  it('should not be able to create a user', async () => {
    //Arrange
    const createUser: CreateUserDTO = {
      name: 'Jean teste',
      email: 'teste@gmail.com',
      password: 'teste@gmail.com',
    };
    const expectedResponse = new BadRequestError(EMAIL_ALREADY_USED);
    try {
      //Act
      await createUserService.execute(createUser);
    } catch (error) {
      //Assert
      expect(error).toEqual(expectedResponse)
      expect(error).toBeInstanceOf(BadRequestError)
    }
  });
});
