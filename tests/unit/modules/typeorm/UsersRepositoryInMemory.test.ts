import { UsersRepositoryInMemory } from 'src/modules/infra/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';

describe('UsersRepositoryInMemory', () => {
  let usersRepository: UsersRepositoryInMemory;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
  });

  describe('findAll', () => {

    it('should be possible to find all users', async () => {
      //Arrange
      const createUserDTO1: CreateUserDTO = {
        name: 'test1',
        email: 'test1@example.com',
        password: '123456',
      };
      const createUserDTO2: CreateUserDTO = {
        name: 'test2',
        email: 'test2@example.com',
        password: '654321',
      };
      await usersRepository.create(createUserDTO1);
      await usersRepository.create(createUserDTO2);
      //Act
      const users = await usersRepository.findAll();
      //Assert
      expect(users).toHaveLength(2);
      expect(users[0]).toEqual(expect.objectContaining(createUserDTO1));
      expect(users[1]).toEqual(expect.objectContaining(createUserDTO2));
    });
  });

  describe('create', () => {

    it('should be able to create a new user', async () => {
      //Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test3',
        email: 'test3@example.com',
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
        name: 'test4',
        email: 'test4@example.com',
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

    it('should not return incorrect user', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'test5',
        email: 'test5@example.com',
        password: '123456',
      };

      await usersRepository.create(createUserDTO);
      const user = await usersRepository.findByName('someOtherName');

      expect(user).toBeNull();
    });
  });

  describe('findByEmail', () => {

    it('should be possible to find a user by email', async () => {
      //Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test5',
        email: 'test5@example.com',
        password: '123456',
      };
      await usersRepository.create(createUserDTO);
      //Act
      const user = await usersRepository.findByEmail(createUserDTO.email);
      //Assert
      expect(user).not.toBeNull();
      expect(user.email).toBe(createUserDTO.email);
    });

    it('should return null if user not found by email', async () => {
      //Arrange
      const invalidEMail = 'invalid@example.com';
      //Act
      const user = await usersRepository.findByEmail(invalidEMail);
      //Assert
      expect(user).toBeNull();
    });

    it('should not return incorrect user', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'test6',
        email: 'test6@example.com',
        password: '123456',
      };

      await usersRepository.create(createUserDTO);
      const user = await usersRepository.findByEmail('someOtherEmail@example.com');

      expect(user).toBeNull();
    });
  });

  describe('findById', () => {

    it('should be possible to find a user by id', async () => {
      //Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'test6',
        email: 'test6@example.com',
        password: '123456',
      };
      const createdUser = await usersRepository.create(createUserDTO);
      //Act
      const user = await usersRepository.findById(createdUser.id);
      //Assert
      expect(user).not.toBeNull();
      expect(user?.id).toBe(createdUser.id);
    });

    it('should be possible to return null if user not found by id', async () => {
      //Arrange
      const ivalidId = 'non-existent-id';
      //Act
      const user = await usersRepository.findById(ivalidId);
      //Assert
      expect(user).toBeNull();
    });

    it('should not return incorrect user', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'test6',
        email: 'test6@example.com',
        password: '123456',
      };

      await usersRepository.create(createUserDTO);
      const user = await usersRepository.findById('invalidId');

      expect(user).toBeNull();
    });
  });

  describe('save', () => {
    it('should be possible to save an existing user', async () => {
      //Arrange
      const createUser: CreateUserDTO = {
        name: 'test7',
        email: 'test7@example.com',
        password: '123456',
      };
      const newUser = await usersRepository.create(createUser);
      //Act
      const updatedUser = await usersRepository.save(newUser);
      //Assert
      expect(updatedUser.name).toBe(createUser.name);
      expect(updatedUser.id).toBe(newUser.id);
    });

    describe('remove', () => {
      it('should be possible to remove a user', async () => {
        // Arrange
        const createUserDTO: CreateUserDTO = {
          name: 'test8',
          email: 'test8@example.com',
          password: '123456',
        };
        const createdUser = await usersRepository.create(createUserDTO);
        // Act
        await usersRepository.remove(createdUser);
        const user = await usersRepository.findById(createdUser.id);
        // Assert
        expect(user).toBeNull();
      });

      it('should not remove any user when id does not match', async () => {
        const createUserDTO: CreateUserDTO = {
          name: 'testNotRemove',
          email: 'testNotRemove@example.com',
          password: '123456',
        };
        const createdUser = await usersRepository.create(createUserDTO);

        const nonExistentUser = {
          ...createdUser,
          id: 'non-existent-id',
        };

        await usersRepository.remove(nonExistentUser);
        const user = await usersRepository.findById(createdUser.id);
        expect(user).not.toBeNull();
        expect(user?.id).toBe(createdUser.id);
      });

      it('should not throw an error if trying to remove a user with an invalid id', async () => {
        const createUserDTO: CreateUserDTO = {
          name: 'testInvalidIdRemove',
          email: 'testInvalidIdRemove@example.com',
          password: '123456',
        };
        const createdUser = await usersRepository.create(createUserDTO);

        const nonExistentUser = {
          ...createdUser,
          id: 'invalid-id', // ID que não corresponde a nenhum usuário
        };

        await expect(usersRepository.remove(nonExistentUser)).resolves.not.toThrow();
      });
    });
  });













});
