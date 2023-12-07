import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLeaderDto {
  @IsNumber()
  @IsNotEmpty()
  tim_id: number;
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;
}
