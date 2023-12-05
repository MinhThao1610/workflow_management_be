import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getComment(
    paginationOptions: { pageIndex: number; pageSize: number },
    milestoneId: number,
  ) {
    const { pageSize, pageIndex } = paginationOptions;

    const totalComment = await this.prisma.comment.count({
      where: {
        milestone_id: milestoneId ? milestoneId : undefined,
      },
    });

    const comments = await this.prisma.comment.findMany({
      where: {
        milestone_id: milestoneId ? milestoneId : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalComment / pageSize);

    return {
      message: 'Success',
      data: comments,
      meta: {
        total: totalComment,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOneComment(id: number) {
    const comment = await this.prisma.comment.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return { message: 'Success', data: comment };
  }

  async createComment(commentDto: CommentDto) {
    const { content, employee_id, milestone_id, createAt, updateAt } =
      commentDto;

    try {
      const newComment = await this.prisma.comment.create({
        data: {
          content,
          employee_id,
          milestone_id,
          createAt,
          updateAt,
        },
      });

      return { message: 'Success', data: newComment };
    } catch (error) {
      throw new Error(`Could not create Comment: ${error.message}`);
    }
  }

  async updateComment(id: number, commentDto: CommentDto) {
    const existingComment = await this.prisma.comment.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingComment) {
      throw new HttpException('Comment không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const updateComment = await this.prisma.comment.update({
        where: { id: id },
        data: commentDto,
      });

      return { message: 'Success', data: updateComment };
    } catch (error) {
      throw new Error(`Could not update Comment: ${error.message}`);
    }
  }

  async deleteComment(id: number) {
    const existingComment = await this.prisma.comment.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingComment) {
      throw new HttpException('Comment không tồn tại!', HttpStatus.NOT_FOUND);
    }

    try {
      const deleteComment = await this.prisma.comment.delete({
        where: { id: id },
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(`Could not delete Comment: ${error.message}`);
    }
  }
}
