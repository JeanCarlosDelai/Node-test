import 'reflect-metadata';
import 'dotenv/config';
import app from './app';
import { dataSource } from '../typeorm/dataSource';

dataSource.initialize().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}! 🏆`);
  });
});
