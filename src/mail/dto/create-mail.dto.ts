import { IsOptional } from 'class-validator';

export class CreateMailDto {
  @IsOptional()
  code: string;
  @IsOptional()
  name: string;
  @IsOptional()
  email: string;
  @IsOptional()
  fromEmail: string;
  @IsOptional()
  subject: string;
  @IsOptional()
  message: string;
  @IsOptional()
  url: string;
  @IsOptional()
  platform: string;
}
