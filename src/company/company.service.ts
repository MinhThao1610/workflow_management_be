import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const {
      name,
      phone,
      email,
      logo,
      website,
      address,
      description,
      mission,
      coreValue,
      slogan,
      banner,
      expiredTime,
      status,
    } = createCompanyDto;

    try {
      const newCompany = await this.prisma.company.create({
        data: {
          name,
          phone,
          email,
          logo,
          website,
          address,
          description,
          mission,
          coreValue,
          slogan,
          banner,
          expiredTime,
          status,
        },
      });

      return newCompany;
    } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error(`Could not create company: ${error.message}`);
    }
  }

  async getCompaniesWithFilters(
    paginationOptions: { pageIndex: number; pageSize: number },
    filters: FilterDto,
  ) {
    const { pageSize, pageIndex } = paginationOptions;
    const { name, phone, email, status } = filters;

    const totalCompanies = await this.prisma.company.count({
      where: {
        // Áp dụng các filters
        name: name ? { contains: name } : undefined,
        phone: phone ? { contains: phone } : undefined,
        email: email ? { contains: email } : undefined,
        status: status ? { equals: status } : undefined,
      },
    });

    const companies = await this.prisma.company.findMany({
      where: {
        // Áp dụng các filters
        name: name ? { contains: name } : undefined,
        phone: phone ? { contains: phone } : undefined,
        email: email ? { contains: email } : undefined,
        status: status ? { equals: status } : undefined,
      },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize,
    });

    const totalPage = Math.ceil(totalCompanies / pageSize);

    return {
      data: companies,
      meta: {
        total: totalCompanies,
        currentPage: pageIndex,
        totalPages: totalPage,
        pageSize: pageSize,
      },
    };
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return company;
  }

  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
    const existingCompany = await this.prisma.company.findUniqueOrThrow({
      where: { id: id },
    });

    if (!existingCompany) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });

    return updatedCompany;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
