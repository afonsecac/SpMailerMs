import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './providers/mail.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('register_mail')
  create(@Payload() createMailDto: CreateMailDto) {
    return this.mailService.registerMailerToComremit(createMailDto);
  }
}
