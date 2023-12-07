import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { UpdateLeaderDto } from './dto/update-leader.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterLeaderDto } from './dto/filter-leader.dto';

@Injectable()
export class LeaderService {
  constructor(private prisma: PrismaService) {}
  async create(createLeaderDto: CreateLeaderDto) {
    try {
      const newLeader = await this.prisma.leaders.create({
        data: createLeaderDto,
      });
      return {
        message: 'Tạo leader thành công!',
        data: newLeader,
      };
    } catch (error) {
      throw new HttpException('Thông tin không hợp lệ', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(filterDto: FilterLeaderDto) {
    try {
      const { tim_id, employee_id, pageIndex, pageSize } = filterDto;
      const leaders = await this.prisma.leaders.findMany({
        where: {
          tim_id: tim_id ?? undefined,
          employee_id: employee_id ?? undefined,
        },
        take: pageSize,
        skip: (pageIndex - 1) * pageSize,
      });

      const totalCount = await this.prisma.leaders.count({
        where: {
          tim_id: tim_id ?? undefined,
          employee_id: employee_id ?? undefined,
        },
      });

      const totalPages = Math.ceil(totalCount / pageSize);
      return {
        data: leaders,
        meta: {
          total: totalCount,
          pageIndex,
          totalPages,
          pageSize: pageSize,
        },
      };
    } catch (error) {
      throw new HttpException(
        'Tham số truyền vào không hợp lệ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    try {
      const findLeader = await this.prisma.leaders.findUnique({
        where: { id },
      });
      if (!findLeader)
        throw new HttpException('Id không tồn tại', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException('Đã có lỗi xảy ra', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateLeaderDto: UpdateLeaderDto) {
    try {
      const findLeader = await this.prisma.leaders.findUnique({
        where: { id },
      });
      if (!findLeader)
        throw new HttpException('Id không tồn tại', HttpStatus.BAD_REQUEST);

      const updateLeader = await this.prisma.leaders.update({
        where: {
          id,
        },
        data: updateLeaderDto,
      });
      return updateLeader;
    } catch (error) {
      throw new HttpException('Đã có lỗi xảy ra', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} leader`;
  }
}
