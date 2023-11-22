// update-company.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsDate,
  IsDateString,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  coreValue?: string;

  @IsOptional()
  @IsString()
  slogan?: string;

  @IsOptional()
  @IsUrl()
  banner?: string;

  @IsOptional()
  @IsDateString()
  expiredTime?: Date;

  @IsOptional()
  @IsString()
  status?: string;
}
