import { IUsersRepository } from "src/modules/domain/interfaces/UserRepository.interfece";
import { Repository } from "typeorm";
import User from "../../entities/User";
import { IUser } from "src/modules/domain/interfaces/User.interface";
import { CreateUserDTO } from "src/modules/domain/dtos/CreateUser.dto";
import { dataSource } from "src/shared/infra/typeorm/dataSource";


export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create(createUser: CreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(createUser);
    return await this.ormRepository.save(user);
  }

  public async save(user: IUser): Promise<IUser> {
    return await this.ormRepository.save(user);
  }

  public async findAll(): Promise<IUser[]> {
    return await this.ormRepository.find()
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

  public async remove(user: IUser): Promise<void> {
    await this.ormRepository.remove(user);
  }
}