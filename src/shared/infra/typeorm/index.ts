import { DataSource } from 'typeorm';
import { CreateUserTable1718991698597 } from './migrations/1718991698597-CreateUserTable';
import User from 'src/modules/infra/typeorm/entities/User';

export const dataSource = new DataSource({
    type: 'sqlite',
    database: 'database.db',
    entities: [User],
    migrations: [CreateUserTable1718991698597],
    synchronize: false,
    logging: false,
});