import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  @IsNumber()
  employee_id: number;

  @IsNotEmpty()
  @IsNumber()
  milestone_id: number;

  @IsOptional()
  @Transform(({ value }) => value || new Date())
  createAt: Date;
}
