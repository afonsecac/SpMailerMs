import { Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailController } from './mail.controller';

@Module({
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
