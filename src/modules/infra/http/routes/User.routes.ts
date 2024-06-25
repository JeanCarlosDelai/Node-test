import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import Validator from 'src/shared/infra/http/middlewares/Validator';
import { CreateUserSchema } from '../schemas/CreateUserSchema';

const usersRouter = Router();
const createUserController = new CreateUserController();

usersRouter.post('/user', Validator(CreateUserSchema), createUserController.execute);

export default usersRouter;