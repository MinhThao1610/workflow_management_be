import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FilterDto } from './dto/filter.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import Role from 'src/auth/role/role.enum';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SystemAdmin)
  @Post('create')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  async getCompanies(@Query() filters: FilterDto) {
    const companies = await this.companyService.getCompaniesWithFilters(
      filters,
    );

    return companies;
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SystemAdmin, Role.Admin)
  @Patch('update/:id')
  async updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SystemAdmin)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
