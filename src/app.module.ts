import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { envs } from './config';

@Module({
  imports: [MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
