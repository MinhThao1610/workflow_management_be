import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TestObjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  creator_id: number;

  @IsNotEmpty()
  @IsNumber()
  sprint_id: number;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  createAt: Date;
}
