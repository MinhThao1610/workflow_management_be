import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, phone } = createUserDto;
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });

    if (existingUser) {
      // Nếu đã tồn tại user với email hoặc phone đã nhập
      throw new HttpException(
        'Email or phone already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
      });

      return newUser;
    } catch (error) {
      // Xử lý lỗi nếu có
      throw new HttpException(`Could not create user`, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers(filters: FilterUserDto) {
    const { name, role, phone, email, disable, pageSize, pageIndex } = filters;

    const where = {
      name: name ? { contains: name } : undefined,
      role: role ? { equals: role } : undefined,
      phone: phone ? { contains: phone } : undefined,
      email: email ? { contains: email } : undefined,
      disable: disable ? { equals: disable === 'true' } : undefined,
    };

    const users = await this.prisma.user.findMany({
      where,
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    // Bổ sung logic tính toán metadata phân trang ở đây nếu cần
    const totalCount = await this.prisma.user.count({ where });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data: users,
      meta: {
        total: totalCount,
        pageIndex,
        totalPages,
        pageSize: pageSize,
      },
    };
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new HttpException('Lỗi khi tìm thông tin user', error?.message);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async deleteUser(userId: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      throw new HttpException(
        `User with ID ${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deleteduser = await this.prisma.user.delete({
      where: { id: userId },
    });
    return {
      message: 'Xoá user thành công',
      code: HttpStatus.OK,
    };
  }
}
