import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { MailService } from './providers/mail.service';
import { envs } from '../config';
import { join } from 'path';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: envs.mailerHost,
        secure: true,
        port: envs.mailerPort,
        auth: {
          user: envs.mailerUser,
          pass: envs.mailerPass,
        },
      },
      defaults: {
        from: '"No Reply" <support@sendmundo.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
