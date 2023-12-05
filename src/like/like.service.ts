import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async getLike(
    paginationOptions: { pageIndex: number; pageSize: number },
    milestoneId: number,
  ) {
    const { pageSize, pageIndex } = paginationOptions;

    const totalLike = await this.prisma.like.count({
      where: {
        milestone_id: milestoneId ? milestoneId : undefined,
      },
    });

    const likes = await this.prisma.like.findMany({
      where: {
        milestone_id: milestoneId ? milestoneId : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalLike / pageSize);

    return {
      message: 'Success',
      data: likes,
      meta: {
        total: totalLike,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOneLike(id: number) {
    const like = await this.prisma.like.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return { message: 'Success', data: like };
  }

  async createLike(likeDto: LikeDto) {
    const { employee_id, milestone_id, createAt } = likeDto;

    try {
      const newLike = await this.prisma.like.create({
        data: {
          employee_id,
          milestone_id,
          createAt,
        },
      });

      return { message: 'Success', data: newLike };
    } catch (error) {
      throw new Error(`Could not create Like: ${error.message}`);
    }
  }

  async updateLike(id: number, likeDto: LikeDto) {
    const existingLike = await this.prisma.like.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingLike) {
      throw new HttpException('Like không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const updateLike = await this.prisma.like.update({
        where: { id: id },
        data: likeDto,
      });

      return { message: 'Success', data: updateLike };
    } catch (error) {
      throw new Error(`Could not update Like: ${error.message}`);
    }
  }

  async deleteLike(id: number) {
    const existingLike = await this.prisma.like.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingLike) {
      throw new HttpException('Like không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const deleteLike = await this.prisma.like.delete({
        where: { id: id },
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(`Could not delete Like: ${error.message}`);
    }
  }
}
