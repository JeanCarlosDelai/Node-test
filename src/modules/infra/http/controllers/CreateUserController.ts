import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from 'src/modules/services/CreateUserService';
import { CreateUserDTO } from 'src/modules/domain/dtos/CreateUser.dto';

export class CreateUserController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
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