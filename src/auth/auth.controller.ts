import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorator/get-user.decorator';
import { VerifyOTP } from './dto/verify-otp.dto';
import { ResetPassDto } from './dto/reset-pass.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    const newUser = await this.authService.create(createAuthDto);
    return newUser;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const userLogin = await this.authService.login(loginDto);
    return userLogin;
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    const newAccessToken = await this.authService.refreshAccessToken(
      refreshToken,
    );
    return newAccessToken;
  }

  @Get('get-my-info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@GetUser() user: any) {
    return await this.authService.getUserInfo(user);
  }

  @Post('send-otp-forgot-pass')
  async sendOtpForgotPass(@Body() { email }: { email: string }) {
    return await this.authService.sendOTPWhenForgotPass(email);
  }

  @Post('verify-otp-forgot-pass')
  async verifyOtpForgotPass(@Body() verifyOTP: VerifyOTP) {
    return await this.authService.verifyOTPResetPassWord(
      verifyOTP.email,
      verifyOTP.otp,
    );
  }

  @Post('reset-pass')
  async resetPass(@Body() resetPassBody: ResetPassDto) {
    return await this.authService.resetPass(
      resetPassBody.token,
      resetPassBody.email,
      resetPassBody.newPass,
    );
  }
}
