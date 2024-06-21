import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from 'src/modules/useCases/CreateUserUseCase';
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';

export default class CreateUserController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserUseCase);
    const { name, email, password } = request.body;
    const createUserDTO: CreateUserDTO = {
      name,
      email,
      password,
    };
    const users = await createUser.execute(createUserDTO);

    return response.json(users);
  }
}