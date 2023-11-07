import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GuardsModule } from './guards/guards.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';

@Module({
  controllers: [AuthController],

  imports: [
    GuardsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, OtpService, EmailService],
})
export class AuthModule {}
