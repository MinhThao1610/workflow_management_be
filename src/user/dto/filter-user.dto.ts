// filter.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import Role from 'src/auth/role/role.enum';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FilterUserDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  disable?: string;
}
