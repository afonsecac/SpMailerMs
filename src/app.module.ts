import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { envs } from './config';

@Module({
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
          strict: false,
        },
      },
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
