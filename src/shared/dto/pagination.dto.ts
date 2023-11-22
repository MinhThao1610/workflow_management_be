import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  @Min(1)
  pageSize: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  @Min(1)
  pageIndex: number;
}
