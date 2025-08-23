import { Injectable } from '@nestjs/common';
import { CreateMailDto } from '../dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  registerMailer(account: CreateMailDto) {
    console.log(account);
    try {
      return this.mailerService.sendMail({
        to: account.email,
        subject: account.subject,
        template: `./register.${account.platform.toLowerCase()}`,
        context: {
          name: account.name,
          code: account.code,
          url: account.url,
          platform: account.platform,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
