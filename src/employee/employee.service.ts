import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterEmployeeDto } from './dto/filter-employee.dto';
import Role from 'src/auth/role/role.enum';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(employeeDto: CreateEmployeeDto) {
    try {
      const findEmployee = await this.prisma.employees.findUnique({
        where: {
          email: employeeDto.email,
        },
      });

      if (findEmployee)
        throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
      const newEmployee = await this.prisma.employees.create({
        data: employeeDto,
      });

      return newEmployee;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log('error', error);

      throw new HttpException(
        'Tạo user không thành công! Vui lòng kiểm tra lại thông tin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEmployees(filters: FilterEmployeeDto) {
    const {
      role,
      name,
      isWorking,
      company_id,
      tim_id,
      disable,
      pageSize,
      pageIndex,
    } = filters;

    const where = {
      role: role ? { equals: role } : undefined,
      name: name ? { contains: name } : undefined,
      isWorking: isWorking !== undefined ? { equals: isWorking } : undefined,
      company_id: company_id ? { equals: company_id } : undefined,
      tim_id: tim_id ? { equals: tim_id } : undefined,
      disable: disable !== undefined ? { equals: disable } : undefined,
    };

    const employees = await this.prisma.employees.findMany({
      where: where,
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalCount = await this.prisma.employees.count({ where });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: employees,
      meta: {
        total: totalCount,
        pageIndex,
        totalPages,
        pageSize: pageSize,
      },
    };

    return employees;
  }

  async findOne(id: number) {
    const findEmployee = await this.prisma.employees.findUnique({
      where: { id },
    });
    if (!findEmployee)
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    return findEmployee;
  }

  async updateEmployee(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
    user: any,
  ) {
    const existingEmployee = await this.prisma.employees.findUnique({
      where: { id },
    });
    if (!existingEmployee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    const { role, sub: userId } = user;
    if (role === Role.User) {
      if (userId !== existingEmployee.user_id)
        throw new HttpException('Bạn không có quyền', HttpStatus.FORBIDDEN);
    }

    const updatedEmployee = await this.prisma.employees.update({
      where: { id },
      data: updateEmployeeDto,
    });

    return updatedEmployee;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
