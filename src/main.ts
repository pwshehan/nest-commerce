import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './app.module';
import * as Express from 'express';

const server = Express();
server.get('/', (req, res) => res.send('ok'));
server.get('/_ah/health', (req, res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  await app.listen(8080);
}
bootstrap();
