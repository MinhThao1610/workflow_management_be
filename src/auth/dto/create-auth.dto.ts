import Role from 'src/auth/role/role.enum';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
  IsBoolean,
} from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  @MinLength(8)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(300)
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  school: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsBoolean()
  disable?: boolean;
}
