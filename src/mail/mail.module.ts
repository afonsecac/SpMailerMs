import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './providers/mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [],
})
export class MailModule {}
