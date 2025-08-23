import { Injectable, Logger } from '@nestjs/common';
import { CreateMailDto } from '../dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async registerMailer(account: CreateMailDto) {
    const logger = new Logger('Mailer-Microservice');
    const templateName = `${account.platform[0].toUpperCase()}${account.platform.slice(1).toLowerCase()}`;
    try {
      await this.mailerService.sendMail({
        to: account.email,
        subject: account.subject,
        template: `./register${templateName}`,
        context: {
          name: account.name,
          code: account.code,
          url: account.url,
          platform: account.platform,
        },
      });
      logger.log(
        `Mail register sent with template: register${templateName}.hbs to account: ${account.email}`,
      );
    } catch (error) {
      logger.error(error);
    }
  }
}
