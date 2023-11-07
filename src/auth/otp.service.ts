import { HttpException, HttpStatus } from '@nestjs/common';
// otp.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtpService {
  constructor(private readonly prisma: PrismaService) {}

  async generateOtp(email: string) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!findUser)
      throw new HttpException(
        'Email chưa được đăng ký với bất kỳ nhân sự nào!',
        HttpStatus.BAD_REQUEST,
      );
    const time = Date.now() + 300000; // Thêm 300 giây (5 phút) vào thời gian hiện tại
    const otpRes = Math.floor(100000 + Math.random() * 900000);
    const addOTP = await this.prisma.oTP.create({
      data: {
        otp: String(otpRes),
        expireTime: new Date(time),
        userId: findUser.id,
      },
    });
    if (!addOTP)
      throw new HttpException(
        'Đã có lỗi xảy ra! Vui lòng thử lại',
        HttpStatus.BAD_REQUEST,
      );
    return {
      otp: otpRes,
      name: findUser.name,
    };
  }
}
