import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}
  async create(createEmailDto: CreateEmailDto) {
    await this.mailService.sendMail({
      to: process.env.MAIL_USER,
      from: createEmailDto.email,
      subject: 'Message from Contact Us',
      html: `${createEmailDto.message}: ${createEmailDto.name}`,
    });
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
