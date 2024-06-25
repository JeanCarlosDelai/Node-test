import 'reflect-metadata'
import { CreateUserDTO } from "src/modules/domain/dtos/CreateUser.dto";
import { IUser } from "src/modules/domain/interfaces/User.interface";
import { IUsersRepository } from "src/modules/domain/interfaces/UserRepository.interfece";
import { UserRespondeDTO } from 'src/modules/domain/dtos/UserReponse.dto';
import { CreateUserService } from 'src/modules/services/CreateUserService';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/ErrorMessagesConsts';
import { vi } from 'vitest';

let createUserService: CreateUserService;
let usersRepository: IUsersRepository;

beforeAll(() => {
  usersRepository = {
    findByEmail: vi.fn(),
    create: vi.fn(),
  } as unknown as IUsersRepository;

  createUserService = new CreateUserService(usersRepository);
});

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    //Arrange
    const createUser: CreateUserDTO = {
      name: 'teste teste',
      email: 'teste@gmail.com',
      password: 'teste@gmail.com',
    };
    const newUser: IUser = {
      id: '1',
      name: createUser.name,
      email: createUser.email,
      password: createUser.password,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const expectedResponse: UserRespondeDTO = {
      id: newUser.id,
      name: createUser.name,
      email: createUser.email,
    }
    vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(null);
    vi.spyOn(usersRepository, 'create').mockResolvedValueOnce(newUser);
    //Act
    const user = await createUserService.execute(createUser);
    //Assert
    expect(user).toEqual(expectedResponse)
  });

  it('should not be able to create a user', async () => {
    //Arrange
    const createUser: CreateUserDTO = {
      name: 'teste teste',
      email: 'teste@gmail.com',
      password: 'teste@gmail.com',
    };
    const newUser: IUser = {
      id: '1',
      name: createUser.name,
      email: createUser.email,
      password: createUser.password,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const expectedResponse = new BadRequestError(EMAIL_ALREADY_USED);
    vi.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(newUser);
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
