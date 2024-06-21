import { IUsersRepository } from 'src/modules/domain/interfaces/UserRepository.interfece';
import { UsersRepository } from 'src/modules/infra/typeorm/repositories/implementation/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

