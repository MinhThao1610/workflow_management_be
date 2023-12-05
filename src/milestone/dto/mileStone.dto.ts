import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MileStoneDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  linkVideo: string;

  @IsOptional()
  datetime: Date;

  @IsNotEmpty()
  @IsNumber()
  company_id: number;

  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  createAt: Date;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  updateAt: Date;
}
