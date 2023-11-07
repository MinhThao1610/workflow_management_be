import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class ResetPassDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  newPass: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
