import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  mission: string;

  @IsNotEmpty()
  @IsString()
  coreValue: string;

  @IsNotEmpty()
  @IsString()
  slogan: string;

  @IsNotEmpty()
  @IsString()
  banner: string;

  @IsNotEmpty()
  @IsDateString()
  expiredTime: Date;

  @IsOptional()
  @IsString()
  status: string;
}
