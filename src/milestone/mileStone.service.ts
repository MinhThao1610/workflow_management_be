import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MileStoneDto } from './dto/MileStone.dto';

@Injectable()
export class MileStoneService {
  constructor(private prisma: PrismaService) {}

  async getMileStone(
    paginationOptions: { pageIndex: number; pageSize: number },
    companyId: number,
    employeeId: number,
  ) {
    const { pageSize, pageIndex } = paginationOptions;

    const totalMileStone = await this.prisma.milestone.count({
      where: {
        company_id: companyId ? companyId : undefined,
        employee_id: employeeId ? employeeId : undefined,
      },
    });

    const mileStones = await this.prisma.milestone.findMany({
      where: {
        company_id: companyId ? companyId : undefined,
        employee_id: employeeId ? employeeId : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalMileStone / pageSize);

    return {
      message: 'Success',
      data: mileStones,
      meta: {
        total: totalMileStone,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOneMileStone(id: number) {
    const mileStone = await this.prisma.milestone.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return { message: 'Success', data: mileStone };
  }

  async createMileStone(mileStoneDto: MileStoneDto) {
    const mileStone = await this.prisma.milestone.findUnique({
      where: {
        title: mileStoneDto.title,
      },
    });

    if (mileStone) {
      throw new HttpException('Title đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    try {
      const newMileStone = await this.prisma.milestone.create({
        data: mileStoneDto,
      });

      return { message: 'Success', data: newMileStone };
    } catch (error) {
      throw new Error(`Could not create MileStone: ${error.message}`);
    }
  }

  async updateMileStone(id: number, mileStoneDto: MileStoneDto) {
    const existingMileStone = await this.prisma.milestone.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingMileStone) {
      throw new HttpException('MileStone không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const updateMileStone = await this.prisma.milestone.update({
        where: { id: id },
        data: mileStoneDto,
      });

      return { message: 'Success', data: updateMileStone };
    } catch (error) {
      throw new Error(`Could not update MileStone: ${error.message}`);
    }
  }

  async deleteMileStone(id: number) {
    const existingMileStone = await this.prisma.milestone.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingMileStone) {
      throw new HttpException('MileStone không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const deleteMileStone = await this.prisma.milestone.delete({
        where: { id: id },
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(`Could not delete MileStone: ${error.message}`);
    }
  }
}
