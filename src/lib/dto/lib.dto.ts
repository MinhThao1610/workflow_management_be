import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class LibDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  isShow: boolean;

  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  createAt: Date;
}
