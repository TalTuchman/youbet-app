import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors(); // <-- ADD THIS LINE to allow cross-origin requests

  await app.listen(3000);
}
bootstrap();
