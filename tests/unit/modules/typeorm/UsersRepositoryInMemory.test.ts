import { UsersRepositoryInMemory } from 'src/modules/infra/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { IUser } from 'src/modules/domain/interfaces/User.interface';

describe('UsersRepositoryInMemory', () => {
  let usersRepository: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
  });

  describe('findAll', () => {

    it('should be possible to find all users', async () => {
      //Arrange
      const createUserDTO1: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };
      const createUserDTO2: CreateUserDTO = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: '654321',
      };
      await usersRepository.create(createUserDTO1);
      await usersRepository.create(createUserDTO2);
      //Act
      const users = await usersRepository.findAll();
      //Assert
      expect(users).toHaveLength(2);
    });
  });

  describe('create', () => {

    it('should be able to create a new user', async () => {
      //Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };
      //Act
      const user = await usersRepository.create(createUserDTO);
      //Assert
      expect(user).toHaveProperty('id');
      expect(user.name).toBe(createUserDTO.name);
      expect(user.email).toBe(createUserDTO.email);
    });
  });

  describe('findByName', () => {

    it('should be possible to find a user by name', async () => {
      //Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };
      //Act
      await usersRepository.create(createUserDTO);
      const user = await usersRepository.findByName(createUserDTO.name);
      //Assert
      expect(user).not.toBeNull();
      expect(user?.name).toBe(createUserDTO.name);
    });

    it('should return null if user not found by name', async () => {
      //Arrange
      const invalidName = 'invalid';
      //Act
      const user = await usersRepository.findByName(invalidName);
      //Assert
      expect(user).toBeNull();
    });
  });

  describe('findByEmail', () => {

    it('should be possible to find a user by email', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };

      await usersRepository.create(createUserDTO);
      const user = await usersRepository.findByEmail('john.doe@example.com');

      expect(user).not.toBeNull();
      expect(user?.email).toBe(createUserDTO.email);
    });

    it('should return null if user not found by email', async () => {
      const user = await usersRepository.findByEmail('non.existent@example.com');

      expect(user).toBeNull();
    });
  });

  describe('findById', () => {

    it('should be possible to find a user by id', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };

      const createdUser = await usersRepository.create(createUserDTO);
      const user = await usersRepository.findById(createdUser.id);

      expect(user).not.toBeNull();
      expect(user?.id).toBe(createdUser.id);
    });

    it('should return null if user not found by id', async () => {
      const user = await usersRepository.findById('non-existent-id');

      expect(user).toBeNull();
    });
  });

  describe('save', () => {
    it('should save an existing user', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      };

      const createdUser = await usersRepository.create(createUserDTO);
      createdUser.name = 'John Updated Doe';

      const updatedUser = await usersRepository.save(createdUser);

      expect(updatedUser.name).toBe('John Updated Doe');
      expect(updatedUser.id).toBe(createdUser.id);
    });
  });













});
