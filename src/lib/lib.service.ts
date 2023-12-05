import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LibDto } from './dto/lib.dto';

@Injectable()
export class LibService {
  constructor(private prisma: PrismaService) {}

  async getLib(
    paginationOptions: { pageIndex: number; pageSize: number },
    companyId: number,
    type: string,
    createAt: Date,
  ) {
    const { pageSize, pageIndex } = paginationOptions;

    const totalLib = await this.prisma.lib.count({
      where: {
        company_id: companyId ? companyId : undefined,
        type: type ? type : undefined,
        createAt: createAt ? createAt : undefined,
      },
    });

    const libs = await this.prisma.lib.findMany({
      where: {
        company_id: companyId ? companyId : undefined,
        type: type ? type : undefined,
        createAt: createAt ? createAt : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalLib / pageSize);

    return {
      message: 'Success',
      data: libs,
      meta: {
        total: totalLib,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOneLib(id: number) {
    const lib = await this.prisma.lib.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return { message: 'Success', data: lib };
  }

  async createLib(libDto: LibDto) {
    const lib = await this.prisma.lib.findUnique({
      where: {
        title: libDto.title,
      },
    });

    if (lib) {
      throw new HttpException('Title đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    try {
      const newLib = await this.prisma.lib.create({
        data: libDto,
      });

      return { message: 'Success', data: newLib };
    } catch (error) {
      throw new Error(`Could not create Lib: ${error.message}`);
    }
  }

  async updateLib(id: number, libDto: LibDto) {
    const existingLib = await this.prisma.lib.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingLib) {
      throw new HttpException('Lib không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const updateLib = await this.prisma.lib.update({
        where: { id: id },
        data: libDto,
      });

      return { message: 'Success', data: updateLib };
    } catch (error) {
      throw new Error(`Could not update Lib: ${error.message}`);
    }
  }

  async deleteLib(id: number) {
    const existingLib = await this.prisma.lib.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingLib) {
      throw new HttpException('Lib không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const deleteLib = await this.prisma.lib.delete({
        where: { id: id },
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(`Could not delete Lib: ${error.message}`);
    }
  }
}
