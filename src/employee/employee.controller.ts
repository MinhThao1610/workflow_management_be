import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import Role from 'src/auth/role/role.enum';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SystemAdmin, Role.Admin)
  @Post('create')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  findAll(@Query() filters: FilterEmployeeDto) {
    return this.employeeService.getEmployees(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @GetUser() user: any,
  ) {
    return this.employeeService.updateEmployee(+id, updateEmployeeDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
