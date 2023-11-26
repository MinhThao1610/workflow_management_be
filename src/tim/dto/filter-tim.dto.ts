import { TypeTim } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FilterTimDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsEnum(TypeTim)
  type?: TypeTim;

  @IsOptional()
  @IsString()
  company_id?: string;

  @IsOptional()
  @IsString()
  isPublic?: string;
}
