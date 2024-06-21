import { IUsersRepository } from "src/modules/domain/interfaces/UserRepository.interfece";
import { Repository } from "typeorm";
import User from "../../entities/User";
import { dataSource } from "src/shared/infra/typeorm";
import { IUser } from "src/modules/domain/interfaces/User.interface";
import { CreateUserDTO } from "src/modules/domain/dtos/CreateUser.dto";


export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create(createUser: CreateUserDTO): Promise<IUser> {
    return this.ormRepository.create(createUser);
  }

  public async save(user: IUser): Promise<IUser> {
    return await this.ormRepository.save(user);
  }

  public async findAll(): Promise<any> {
    const users = await this.ormRepository
      .createQueryBuilder('users')
      .getMany();

    const result = {
      data: users,
    };

    return result;
  }

  public async findByName(name: string): Promise<IUser | null> {
    return await this.ormRepository.findOneBy({
      name,
    });
  }

  public async findById(id: string): Promise<IUser | null> {
    return await this.ormRepository.findOneBy({
      id,
    });

  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await this.ormRepository.findOneBy({
      email,
    });
  }
}