import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from '../dto/create-mail.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private mailerService: MailerService) {}

  sendRegisterMail(account: CreateMailDto) {
    try {
      this.logger.debug(`Sending mail with data: ${JSON.stringify(account)}`);
      if (account.platform === undefined || account.platform === null) {
        account.platform = 'comremit';
      }
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
      console.error('Console Error: ' + error);
    }
  }
}
