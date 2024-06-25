import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';
import { UsersRepository } from 'src/modules/infra/typeorm/repositories/implementation/UsersRepository';
import { dataSource } from 'src/shared/infra/typeorm/dataSource';

let repository: UsersRepository;

beforeAll(async () => {
    await dataSource.initialize();
    repository = new UsersRepository();
});

afterEach(async () => {
    await repository.findAll().then(async (users) => {
        for (const user of users) {
            await repository.remove(user);
        }
    });
});

describe('UsersRepository', () => {
    it('should find all users', async () => {
        // Arrange
        const createUserDTO1: CreateUserDTO = {
            name: 'John Doe',
            email: 'john@test.com',
            password: 'password',
        };
        const createUserDTO2: CreateUserDTO = {
            name: 'Jane Doe',
            email: 'jane@test.com',
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

    it('should find user by name', async () => {
        // Arrange
        const createUserDTO: CreateUserDTO = {
            name: 'John Doe',
            email: 'john@test.com',
            password: 'password',
        };
        const newUser = await repository.create(createUserDTO);
        // Act
        const foundUser = await repository.findByName('John Doe');
        // Assert
        expect(foundUser).toBeDefined();
        expect(foundUser!.id).toEqual(newUser.id);
        expect(foundUser!.email).toEqual(newUser.email);
    });

    it('should find user by id', async () => {
        // Arrange
        const createUserDTO: CreateUserDTO = {
            name: 'John Doe',
            email: 'john@test.com',
            password: 'password',
        };
        const newUser = await repository.create(createUserDTO);
        // Act
        const foundUser = await repository.findById(newUser.id);
        // Assert
        expect(foundUser).toBeDefined();
        expect(foundUser!.name).toEqual(newUser.name);
        expect(foundUser!.email).toEqual(newUser.email);
    });

    it('should find user by email', async () => {
        // Arrange
        const createUserDTO: CreateUserDTO = {
            name: 'John Doe',
            email: 'john@test.com',
            password: 'password',
        };
        const newUser = await repository.create(createUserDTO);
        // Act
        const foundUser = await repository.findByEmail('john@test.com');
        // Assert
        expect(foundUser).toBeDefined();
        expect(foundUser!.id).toEqual(newUser.id);
        expect(foundUser!.name).toEqual(newUser.name);
    });
});
