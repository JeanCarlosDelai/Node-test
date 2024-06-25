import { CreateUserDTO } from "src/modules/domain/dtos/CreateUser.dto";
import { IUser } from "src/modules/domain/interfaces/User.interface";
import { IUsersRepository } from "src/modules/domain/interfaces/UserRepository.interfece";


export class UsersRepositoryInMemory implements IUsersRepository {
    private users: IUser[] = [];

    async findAll(): Promise<IUser[]> {
        return this.users;
    }

    async findByName(name: string): Promise<IUser | null> {
        const user = this.users.find(user => user.name === name);
        return user || null;
    }

    async findById(id: string): Promise<IUser | null> {
        const user = this.users.find(user => user.id === id);
        return user || null;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }

    async create(createUserDTO: CreateUserDTO): Promise<IUser> {
        const user: IUser = {
            id: (this.users.length + 1).toString(),
            ...createUserDTO,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const newUser = await this.save(user);
        return newUser;
    }

    async save(user: IUser): Promise<IUser> {
        this.users.push(user);
        return user;
    }

    async remove(user: IUser): Promise<void> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

}
