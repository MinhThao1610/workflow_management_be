import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TestObjectDto } from './dto/testObject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestObjectService {
  constructor(private prisma: PrismaService) {}

  async getTestObject(
    paginationOptions: { pageIndex: number; pageSize: number },
    sprintId: number,
  ) {
    const { pageSize, pageIndex } = paginationOptions;

    const totalTestObj = await this.prisma.testObject.count({
      where: {
        sprint_id: sprintId ? sprintId : undefined,
      },
    });

    const testObjs = await this.prisma.testObject.findMany({
      where: {
        sprint_id: sprintId ? sprintId : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalTestObj / pageSize);

    return {
      message: 'Success',
      data: testObjs,
      meta: {
        total: totalTestObj,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOneTestObject(id: number) {
    const testObj = await this.prisma.testObject.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return { message: 'Success', data: testObj };
  }

  async createTestObject(testObjectDto: TestObjectDto) {
    const { title, description, creator_id, sprint_id, createAt } =
      testObjectDto;

    const testObj = await this.prisma.testObject.findUnique({
      where: {
        title: title,
      },
    });

    if (testObj) {
      throw new HttpException('Title đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    try {
      const newTestObject = await this.prisma.testObject.create({
        data: {
          title,
          description,
          creator_id,
          sprint_id,
          createAt,
        },
      });

      return { message: 'Success', data: newTestObject };
    } catch (error) {
      throw new Error(`Could not create testObject: ${error.message}`);
    }
  }

  async updateTestObject(id: number, testObjectDto: TestObjectDto) {
    const existingTestObject = await this.prisma.testObject.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingTestObject) {
      throw new HttpException(
        'TestObject không tồn tại!',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const updateTestObject = await this.prisma.testObject.update({
        where: { id: id },
        data: testObjectDto,
      });

      return { message: 'Success', data: updateTestObject };
    } catch (error) {
      throw new Error(`Could not update testObject: ${error.message}`);
    }
  }

  async deleteTestOjbect(id: number) {
    const existingTestObject = await this.prisma.testObject.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingTestObject) {
      throw new HttpException(
        'TestObject không tồn tại!',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const deleteTestObject = await this.prisma.testObject.delete({
        where: { id: id },
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(`Could not delete testObject: ${error.message}`);
    }
  }
}
