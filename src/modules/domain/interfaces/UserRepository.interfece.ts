import { CreateUserDTO } from "../dtos/CreateUser.dto";
import { IUser } from "./User.interface";

export interface IUsersRepository {
  findAll(): Promise<any>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(createUserDTO: CreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
}