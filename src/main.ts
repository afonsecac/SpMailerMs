import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Mailer-Microservice');
  const port = envs.port;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${envs.rabbitMQUrl}`],
        queue: `${envs.rabbitMQQueue}`,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();

  logger.log(
    `Mailer-Microservice is listening on port ${port} on host ${envs.host}`,
  );
}

bootstrap();
