import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './providers/mail.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('register_mail')
  create(@Payload() createMailDto: CreateMailDto) {
    this.logger.log('Received message', createMailDto);
    return this.mailService.sendRegisterMail(createMailDto);
  }
}
