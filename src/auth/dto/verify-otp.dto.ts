import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class VerifyOTP {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
