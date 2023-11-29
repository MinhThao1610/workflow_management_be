import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { TestcaseService } from './testcase.service';
import { TestcaseDto } from './dto/testcase.dto';

@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() testcaseDto: TestcaseDto) {
    return this.testcaseService.createTestcase(testcaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  getTestcases(
    @Query() pagination: PaginationDto, // Phần phân trang sử dụng PaginationDto
    @Query() sprint_id: number,
  ) {
    return this.testcaseService.getTestcase(pagination, sprint_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.testcaseService.findOneTestcase(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateTestcase(@Param('id') id: number, @Body() testcaseDto: TestcaseDto) {
    return this.testcaseService.updateTestcase(id, testcaseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.testcaseService.deleteTestcase(+id);
  }
}
