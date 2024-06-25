import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { CreateUserDTO } from '../domain/dtos/CreateUser.dto';
import UserResponseMapper from '../domain/mappings/UserResponseMapper';
import { UserRespondeDTO } from '../domain/dtos/UserReponse.dto';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/ErrorMessagesConsts';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute(createUser: CreateUserDTO): Promise<UserRespondeDTO> {
    const emailExists = await this.usersRepository.findByEmail(createUser.email);

    if (emailExists) {
      throw new BadRequestError(EMAIL_ALREADY_USED);
    }
    const response = await this.usersRepository.create(createUser);

    return UserResponseMapper.response(response)
  }
}

