import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asdasd'],
    maxAge: 300000,
  }));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, })
  )
  await app.listen(3000);
}
bootstrap();
