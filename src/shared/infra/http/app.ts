import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import usersRouter from 'src/modules/infra/http/routes/User.routes';
import { ErrorHandlerMiddleware } from './middlewares/ErrorHandler';
import { NotFound } from './middlewares/NotFound';
import '../typeorm/index';
import '../../container/index';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRouter);

app.use(ErrorHandlerMiddleware);
app.use(NotFound);

export default app;