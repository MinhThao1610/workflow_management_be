import { IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FilterLeaderDto extends PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  tim_id: number;
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;
}
