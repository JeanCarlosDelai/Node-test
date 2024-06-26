import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { UsersRepository } from 'src/modules/infra/typeorm/repositories/implementation/UsersRepository';
import { dataSource } from 'src/shared/infra/typeorm/dataSource';

let repository: UsersRepository;

beforeAll(async () => {
  await dataSource.initialize();
  await dataSource.runMigrations();
  repository = new UsersRepository();
});

afterAll(async () => {
  await dataSource.dropDatabase();
  await dataSource.destroy();
});

describe('UsersRepository', () => {
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

  it('should be possible to delete a user', async () => {
    // Arrange
    const createUserDTO: CreateUserDTO = {
      name: 'test5',
      email: 'test6@test.com',
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
});
