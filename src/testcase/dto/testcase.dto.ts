import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TestcaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  scenario: string;

  @IsNotEmpty()
  @IsNumber()
  creator_id: number;

  @IsNotEmpty()
  @IsNumber()
  tester_id: number;

  @IsOptional()
  @IsString()
  expectedResult: string;

  @IsOptional()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  sprint_id: number;

  @IsOptional()
  @IsNumber()
  testObject_id: number;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  createAt: Date;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  updateAt: Date;
}
