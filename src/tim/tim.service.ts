import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTimDto } from './dto/create-tim.dto';
import { UpdateTimDto } from './dto/update-tim.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterTimDto } from './dto/filter-tim.dto';
import Role from 'src/auth/role/role.enum';

@Injectable()
export class TimService {
  constructor(private prisma: PrismaService) {}

  async createTim(createTimDto: CreateTimDto) {
    try {
      const newTim = await this.prisma.tim.create({
        data: createTimDto,
      });
      return newTim;
    } catch (error) {
      console.log('error', error);

      throw new HttpException('Could not create Tim', HttpStatus.BAD_REQUEST);
    }
  }

  async getTimList(filterTimDto: FilterTimDto) {
    const { name, status, type, company_id, isPublic, pageIndex, pageSize } =
      filterTimDto;
    const where = {
      name: name ? { contains: name } : undefined,
      status: status ? { equals: status } : undefined,
      type: type ? { equals: type } : undefined,
      company_id: company_id ? { equals: parseInt(company_id) } : undefined,
      isPublic: isPublic ? { equals: isPublic === 'true' } : undefined,
    };
    const timList = await this.prisma.tim.findMany({
      where: where,
      // Thêm phân trang nếu cần
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalCount = await this.prisma.tim.count({ where });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: timList,
      meta: {
        total: totalCount,
        pageIndex,
        totalPages,
        pageSize: pageSize,
      },
    };

    return timList;
  }

  async findOne(id: number) {
    const findTim = await this.prisma.tim.findUnique({
      where: { id },
    });
    if (!findTim)
      throw new HttpException('Tim không tồn tại', HttpStatus.NOT_FOUND);
    return findTim;
  }

  async update(id: number, updateTimDto: UpdateTimDto, user: any) {
    const { role, sub: userId } = user;
    const findTim = await this.prisma.tim.findUnique({
      where: { id },
    });

    if (!findTim)
      throw new HttpException('Tim không tồn tại', HttpStatus.NOT_FOUND);
    if (role === Role.User) {
      const findEmployee = await this.prisma.employees.findFirst({
        where: {
          user_id: userId,
        },
      });
      if (!findEmployee)
        throw new HttpException('Bạn không có quyền', HttpStatus.FORBIDDEN);

      const findLeader = await this.prisma.leaders.findUnique({
        where: {
          tim_id: findTim.id,
        },
      });
      if (!findLeader)
        throw new HttpException('Bạn không có quyền', HttpStatus.FORBIDDEN);

      if (findEmployee.id !== findLeader.employee_id)
        throw new HttpException('Bạn không có quyền', HttpStatus.FORBIDDEN);
    }

    const updateTim = await this.prisma.tim.update({
      where: { id },
      data: updateTimDto,
    });
    return updateTim;
  }

  remove(id: number) {
    return `This action removes a #${id} tim`;
  }
}
