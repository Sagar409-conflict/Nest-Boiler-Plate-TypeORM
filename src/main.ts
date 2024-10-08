import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.reduce((acc, error) => {
          if (error.constraints) {
            acc.push(...Object.values(error.constraints));
          }
          return acc;
        }, []);
        return new UnprocessableEntityException(messages[0]);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(4020);
}
bootstrap();
