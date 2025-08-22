import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Mailer-Microservice');
  const port = 3002;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: port,
      },
    },
  );
  await app.listen();

  logger.log(`Mailer-Microservice is listening on port ${port}`);
}

bootstrap();
