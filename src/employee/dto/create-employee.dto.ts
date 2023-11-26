import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import Role from 'src/auth/role/role.enum';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  school?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  network?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsString()
  favoriteImage?: string;

  @IsNotEmpty()
  @IsDateString()
  fromDate: Date;

  @IsOptional()
  @IsDateString()
  toDate?: Date;

  @IsOptional()
  @IsDateString()
  birthday?: Date;

  @IsOptional()
  @IsBoolean()
  isWorking: boolean;

  @IsNotEmpty()
  company_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  tim_id: number;

  @IsBoolean()
  @IsOptional()
  disable?: boolean;
}
