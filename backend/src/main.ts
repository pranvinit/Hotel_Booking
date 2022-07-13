import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const cors = require('cors');
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  // validates all incoming requests using dto object rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cors());
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));

  await app.listen(port);
}
bootstrap();
