import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { EmailService } from './email.service';
import { OtpService } from './otp.service';
import lodash from 'lodash';
import Role from './role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private otpService: OtpService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        employee: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Thông tin tài khoản hoặc mật khẩu không chính xác!',
      );
    }
    const passwordMatch = await compare(password, user.password);
    if (passwordMatch) {
      return user;
    }
    throw new UnauthorizedException(
      'Thông tin tài khoản hoặc mật khẩu không chính xác!',
    );
  }

  async createAccessToken(userId: number, payloadProps: any) {
    const payload = {
      sub: userId,
      email: payloadProps.email,
      role: payloadProps.role,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
    };
  }

  async createResetPassToken(userId: number) {
    const payload = { sub: userId };
    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  async createRefreshToken(userId: number, email: string, role: Role) {
    const payload = { sub: userId, email: email, role: role };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });
    const refreshTokenExpiresAt = new Date();
    refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 1); // Thêm 1 ngày

    await this.prisma.refreshToken.create({
      data: {
        user_id: userId,
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt,
      },
    });
    return refreshToken;
  }

  async create(createUserDto: CreateAuthDto): Promise<any> {
    const { email, password, role } = createUserDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new HttpException('Tài khoản đã tồn tại', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await hash(password, 10);
    const newUser = this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        ...(role && { role }),
      },
    });

    delete (await newUser).password;
    return newUser;
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    delete user.password;
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      refresh_token: await this.createRefreshToken(
        user.id,
        user.email,
        user.role,
      ),
      user_info: user,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const userId = payload.sub;
      const refreshTokenInDB = await this.prisma.refreshToken.findMany({
        where: {
          user_id: userId,
        },
      });

      const findRefreshToken = refreshTokenInDB.find(
        (item) => item.token === refreshToken,
      );

      if (!findRefreshToken)
        throw new UnauthorizedException('Refresh Token không hợp lệ');
      // Kiểm tra xem refreshToken có tồn tại trong cơ sở dữ liệu (hoặc nơi lưu trữ) không.
      // Nếu không tồn tại, bạn có thể ném ra một UnauthorizedException.

      // Nếu refreshToken hợp lệ, bạn có thể tạo lại mã thông báo truy cập.
      const newAccessToken = this.createAccessToken(userId, payload);

      return newAccessToken;
    } catch (error) {
      // Xảy ra lỗi khi xác minh refreshToken, bạn có thể ném ra một UnauthorizedException.
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUserInfo(user: any) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: user.userId,
      },
      include: {
        employee: true,
      },
    });
    if (!findUser)
      throw new HttpException('Đã có lỗi xảy ra!', HttpStatus.BAD_REQUEST);

    delete findUser.password;
    return findUser;
  }

  async sendOTPWhenForgotPass(email: string) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!findUser)
      throw new HttpException(
        'Email chưa được đăng ký!',
        HttpStatus.BAD_REQUEST,
      );

    const otpObj = await this.otpService.generateOtp(email);
    const result = await this.emailService.sendOtp(
      email,
      otpObj.name,
      otpObj.otp,
    );
    return result;
  }

  async verifyOTPResetPassWord(email: string, otp: string) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!findUser)
      throw new HttpException(
        'Email chưa được đăng ký!',
        HttpStatus.BAD_REQUEST,
      );
    const otpList = await this.prisma.oTP.findMany({
      where: {
        userId: findUser.id,
      },
    });
    const findOTP = otpList.find((item) => item.otp === otp);
    if (!findOTP)
      throw new HttpException(
        'OTP không khớp, vui lòng thử lại',
        HttpStatus.BAD_REQUEST,
      );
    if (new Date(findOTP.expireTime) < new Date()) {
      await this.prisma.oTP.delete({
        where: {
          id: findOTP.id,
        },
      });
      throw new HttpException(
        'OTP đã hết hạn, vui lòng thử lại',
        HttpStatus.BAD_REQUEST,
      );
    }
    const resetPassToken = await this.createResetPassToken(findOTP.userId);
    const newResetPassToken = await this.prisma.resetPasswordToken.create({
      data: {
        token: resetPassToken,
        userEmail: findUser.email,
      },
    });
    await this.prisma.oTP.delete({
      where: {
        id: findOTP.id,
      },
    });
    return newResetPassToken;
  }

  async resetPass(token: string, email: string, newPass: string) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!findUser)
      throw new HttpException(
        'Email chưa được đăng ký!',
        HttpStatus.BAD_REQUEST,
      );

    const tokens = await this.prisma.resetPasswordToken.findMany({
      where: {
        userEmail: email,
      },
    });

    const findToken = tokens.find((item) => item.token === token);

    if (!findToken)
      throw new HttpException('Token không hợp lệ', HttpStatus.BAD_REQUEST);
    try {
      await this.jwtService.verify(findToken.token);
    } catch (error) {
      await this.prisma.resetPasswordToken.delete({
        where: {
          id: findToken.id,
        },
      });
      throw new HttpException(
        'Token hết hạn hoặc không hợp lệ',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashNewPass = await hash(newPass, 10);
    const updatedUser = await this.prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        password: hashNewPass,
      },
    });
    await this.prisma.resetPasswordToken.delete({
      where: {
        id: findToken.id,
      },
    });
    delete updatedUser.password;
    return {
      message: 'Thay đổi mật khẩu thành công!',
      data: updatedUser,
    };
  }
}
