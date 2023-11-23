// create-user.dto.ts
import {
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import Role from 'src/auth/role/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  school: string;

  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  disable: boolean;

  @IsBoolean()
  @IsOptional()
  isOwner: boolean;
}
