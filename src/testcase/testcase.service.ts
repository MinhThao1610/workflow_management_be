import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TestcaseDto } from './dto/testcase.dto';

@Injectable()
export class TestcaseService {
  constructor(private prisma: PrismaService) {}

  async getTestcase(
    paginationOptions: { pageIndex: number; pageSize: number },
    sprintId: number,
  ) {
    const { pageSize, pageIndex } = paginationOptions;

    const totalTestcase = await this.prisma.testcase.count({
      where: {
        sprint_id: sprintId ? sprintId : undefined,
      },
    });

    const testcases = await this.prisma.testcase.findMany({
      where: {
        sprint_id: sprintId ? sprintId : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalTestcase / pageSize);

    return {
      message: 'Success',
      data: testcases,
      meta: {
        total: totalTestcase,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOneTestcase(id: number) {
    const testcase = await this.prisma.testcase.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return { message: 'Success', data: testcase };
  }

  async createTestcase(testcaseDto: TestcaseDto) {
    const testcase = await this.prisma.testcase.findUnique({
      where: {
        title: testcaseDto.title,
      },
    });

    if (testcase) {
      throw new HttpException('Title đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    try {
      const newTestcase = await this.prisma.testcase.create({
        data: testcaseDto,
      });

      return { message: 'Success', data: newTestcase };
    } catch (error) {
      throw new Error(`Could not create testcase: ${error.message}`);
    }
  }

  async updateTestcase(id: number, testcaseDto: TestcaseDto) {
    const existingTestcase = await this.prisma.testcase.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingTestcase) {
      throw new HttpException('Testcase không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const updateTestcase = await this.prisma.testcase.update({
        where: { id: id },
        data: testcaseDto,
      });

      return { message: 'Success', data: updateTestcase };
    } catch (error) {
      throw new Error(`Could not update testcase: ${error.message}`);
    }
  }

  async deleteTestcase(id: number) {
    const existingTestcase = await this.prisma.testcase.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingTestcase) {
      throw new HttpException('Testcase không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const deleteTestcase = await this.prisma.testcase.delete({
        where: { id: id },
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(`Could not delete testcase: ${error.message}`);
    }
  }
}
