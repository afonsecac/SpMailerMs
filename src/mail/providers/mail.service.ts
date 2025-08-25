import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from '../dto/create-mail.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private mailerService: MailerService) {}

  sendRegisterMail(account: CreateMailDto) {
    try {
      this.logger.log('Sending mail preparing');
      const platformName = `${account.platform[0].toUpperCase()}${account.platform.slice(1)}`;
      return this.mailerService.sendMail({
        to: account.email,
        subject: account.subject,
        template: `./register.${account.platform}`,
        context: {
          name: account.name,
          code: account.code,
          url: account.url,
          platform: platformName,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
