import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { IUser } from 'src/modules/domain/interfaces/User.interface';
import { UsersRepository } from 'src/modules/infra/typeorm/repositories/implementation/UsersRepository';
import { dataSource } from 'src/shared/infra/typeorm/dataSource';

let repository: UsersRepository;

beforeAll(async () => {
  await dataSource.initialize();
  repository = new UsersRepository();
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

describe('UsersRepository', () => {

  describe('save', () => {

    it('should be possible to save a user', async () => {
      // Arrange
      const user: IUser = {
        id: '1',
        name: 'test10',
        email: 'test10@test.com',
        password: 'password',
        created_at: new Date(),
        updated_at: new Date(),
      };
      // Act
      const response = await repository.save(user);
      // Assert
      expect(response).toEqual(user);
    });
  });

  describe('findAll', () => {

    it('should be possible to find all users', async () => {
      // Arrange
      const createUserDTO1: CreateUserDTO = {
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      const createUserDTO2: CreateUserDTO = {
        name: 'test2',
        email: 'test2@test.com',
        password: 'password',
      };
      await repository.create(createUserDTO1);
      await repository.create(createUserDTO2);
      // Act
      const users = await repository.findAll();
      // Assert
      expect(users).toHaveLength(2);
      expect(users[0].name).toEqual(createUserDTO1.name);
      expect(users[1].name).toEqual(createUserDTO2.name);
    });
  });

  describe('findByName', () => {

    it('should be possible to find a user by name', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test3',
        email: 'test3@test.com',
        password: 'password',
      };
      const newUser = await repository.create(createUserDTO);
      // Act
      const foundUser = await repository.findByName(createUserDTO.name);
      // Assert
      expect(foundUser).toHaveProperty('id');
      expect(foundUser.name).toEqual(newUser.name);
      expect(foundUser.email).toEqual(newUser.email);
    });

    it('should return null if user not found by name', async () => {
      //Arrange
      const invalidName = 'invalid';
      //Act
      const user = await repository.findByName(invalidName);
      //Assert
      expect(user).toBeNull();
    });

    it('should handle case sensitivity properly when finding user by name', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'TestName',
        email: 'testname@test.com',
        password: 'password',
      };
      const newUser = await repository.create(createUserDTO);
      const nameUpperCase = newUser.name.toUpperCase()
      // Act
      const foundUser = await repository.findByName(nameUpperCase);
      // Assert
      expect(foundUser).toBeNull();
    });
  });

  describe('findById', () => {

    it('should be possible to find a user by id', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test4',
        email: 'test4@test.com',
        password: 'password',
      };
      const newUser = await repository.create(createUserDTO);
      // Act
      const foundUser = await repository.findById(newUser.id);
      // Assert
      expect(foundUser).toHaveProperty('id');
      expect(foundUser.name).toEqual(newUser.name);
      expect(foundUser.email).toEqual(newUser.email);
    });

    it('should return null if user not found by id', async () => {
      //Arrange
      const ivalidId = 'non-existent-id';
      //Act
      const user = await repository.findById(ivalidId);
      //Assert
      expect(user).toBeNull();
    });


    it('should handle case sensitivity properly when finding user by id', async () => {
      // Arrange
      const createUser: CreateUserDTO = {
        name: 'TestEmail',
        email: 'Testemail@test.com',
        password: 'password',
      };
      const newUser = await repository.create(createUser);
      const idUpperCase = newUser.id.toUpperCase()
      // Act
      const foundUser = await repository.findById(idUpperCase);
      // Assert
      expect(foundUser).toBeNull();
    });
  });

  describe('findByEmail', () => {

    it('should be possible to find a user by email', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test5',
        email: 'test5@test.com',
        password: 'password',
      };
      const newUser = await repository.create(createUserDTO);
      // Act
      const foundUser = await repository.findByEmail(createUserDTO.email);
      // Assert
      expect(foundUser).toHaveProperty('id');
      expect(foundUser.id).toEqual(newUser.id);
      expect(foundUser.name).toEqual(newUser.name);
    });

    it('should return null if user not found by email', async () => {
      //Arrange
      const invalidEMail = 'invalid@example.com';
      //Act
      const user = await repository.findByEmail(invalidEMail);
      //Assert
      expect(user).toBeNull();
    });

    it('should handle case sensitivity properly when finding user by email', async () => {
      // Arrange
      const createUser: CreateUserDTO = {
        name: 'TestEmail',
        email: 'Testemail@test.com',
        password: 'password',
      };
      const newUser = await repository.create(createUser);
      const emailUpperCase = newUser.email.toUpperCase()
      // Act
      const foundUser = await repository.findByEmail(emailUpperCase);
      // Assert
      expect(foundUser).toBeNull();
    });
  });

  describe('remove', () => {

    it('should be possible to delete a user', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test5',
        email: 'test6@test.com',
        password: 'password',
      };
      await repository.create(createUserDTO);
      const foundUser = await repository.findByEmail(createUserDTO.email);
      // Act
      await repository.remove(foundUser);
      const userExistis = await repository.findByEmail(createUserDTO.email);
      // Assert
      expect(userExistis).toEqual(null);
    });
  });
});
