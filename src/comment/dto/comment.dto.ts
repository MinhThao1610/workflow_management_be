import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @IsNotEmpty()
  @IsNumber()
  milestone_id: number;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  createAt: Date;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  updateAt: Date;
}
