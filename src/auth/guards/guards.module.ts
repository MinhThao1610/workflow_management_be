import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth.controller';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../auth.service';
import { EmailService } from '../email.service';
import { OtpService } from '../otp.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalAuthGuard,
    JwtAuthGuard,
    AuthGuard,
    AuthService,
    EmailService,
    OtpService,
  ],
  exports: [
    LocalAuthGuard,
    JwtAuthGuard,
    AuthGuard,
    AuthService,
    EmailService,
    OtpService,
  ],
})
export class GuardsModule {}
