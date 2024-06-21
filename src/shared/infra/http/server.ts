import 'reflect-metadata';
import 'dotenv/config';
import { dataSource } from 'src/shared/infra/typeorm';
import app from './app';

dataSource.initialize().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}! 🏆`);
  });
});
