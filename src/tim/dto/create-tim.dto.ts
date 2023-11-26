import { TypeTim } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTimDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsEnum(TypeTim)
  type: TypeTim;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsString()
  slogan?: string;

  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @IsOptional()
  @IsBoolean()
  isCancelTask?: boolean;

  // Các trường khác của modal Tim có thể thêm vào đây
}
