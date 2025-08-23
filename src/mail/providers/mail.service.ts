import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from '../dto/create-mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendRegisterMail(account: CreateMailDto) {
    const logger = new Logger('Mailer-Microservice');
    try {
      await this.mailerService
        .sendMail({
          to: account.email,
          subject: account.subject,
          template: `./register.${account.platform.toLowerCase()}`,
          context: {
            name: account.name,
            code: account.code,
            url: account.url,
            platform: account.platform,
          },
        })
        .then(() => {
          logger.log(
            `Mail register sent with template: register.${account.platform}.hbs to account: ${account.email}`,
          );
        });
    } catch (error) {
      logger.error(error);
    }
  }
}
