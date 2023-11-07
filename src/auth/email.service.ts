import { HttpStatus } from '@nestjs/common';
// email.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(email: string, name: string, otp: number) {
    let result;
    await this.mailerService
      .sendMail({
        to: email,
        from: 'otp@tda-uet.xyz',
        subject: 'This is your OTP',
        template: 'otp', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          otp: otp,
          name: name,
        },
      })
      .then((success) => {
        result = {
          status: HttpStatus.CREATED,
          message: 'Gửi OTP thành công! Vui lòng kiểm tra email của bạn.',
        };
        console.log(success);
        return result;
      })
      .catch((err) => {
        console.log(err);
        result = {
          status: HttpStatus.BAD_REQUEST,
          message: 'Đã có lỗi trong quá trình gửi OTP!',
        };
      });
    return result;
  }

  async sendInfoNewAccount(
    name: string,
    email: string,
    username: string,
    password: string,
  ) {
    await this.mailerService
      .sendMail({
        to: email,
        from: 'otp@tda-uet.xyz',
        subject: 'Thông báo thông tin tài khoản của hệ thống chấm công',
        template: 'account-created', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          name,
          username,
          password,
        },
      })
      .then((success) => {
        console.log(success);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
