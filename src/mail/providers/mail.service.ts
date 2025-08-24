import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from '../dto/create-mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendRegisterMail(account: CreateMailDto) {
    try {
      console.log('Sending mail preparing');
      return this.mailerService.sendMail({
        to: account.email,
        subject: account.subject,
        template: `./register`,
        context: {
          name: account.name,
          code: account.code,
          url: account.url,
          platform: account.platform,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
