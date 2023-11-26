import { PartialType } from '@nestjs/mapped-types';
import { CreateTimDto } from './create-tim.dto';

export class UpdateTimDto extends PartialType(CreateTimDto) {}
