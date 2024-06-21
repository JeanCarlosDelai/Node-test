import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';
import { BadRequestError } from 'src/shared/errors/BadRequest.error';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/ErrorConsts';
import { CreateUserDTO } from '../domain/dtos/CreateUser.dto';
import UserResponseMapper from '../domain/mappings/UserResponseMapper';
import { UserRespondeDTO } from '../domain/dtos/UserReponse.dto';
import { UsersRepository } from '../infra/typeorm/repositories/implementation/UsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute(createUserDTO: CreateUserDTO): Promise<UserRespondeDTO> {
    const emailExists = await this.usersRepository.findByEmail(createUserDTO.email);

    if (emailExists) {
      throw new BadRequestError(EMAIL_ALREADY_USED);
    }
    const newUser =  await this.usersRepository.create(createUserDTO);
    const response =  await this.usersRepository.save(newUser);
    return UserResponseMapper.response(response)
  }
}