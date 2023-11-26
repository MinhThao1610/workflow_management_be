// filter-employee.dto.ts
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import Role from 'src/auth/role/role.enum';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FilterEmployeeDto extends PaginationDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isWorking?: boolean;

  @IsOptional()
  @IsNumber()
  company_id?: number;

  @IsOptional()
  @IsNumber()
  tim_id?: number;

  @IsOptional()
  @IsBoolean()
  disable?: boolean;
}
