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
import { TestObjectService } from './testObject.service';
import { TestObjectDto } from './dto/testObject.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('testObject')
export class TestObjectController {
  constructor(private readonly testObjectService: TestObjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() testObjectDto: TestObjectDto) {
    return this.testObjectService.createTestObject(testObjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  getTestObjects(
    @Query() pagination: PaginationDto, // Phần phân trang sử dụng PaginationDto
    @Query() sprint_id: number,
  ) {
    return this.testObjectService.getTestObject(pagination, sprint_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.testObjectService.findOneTestObject(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateTestObject(
    @Param('id') id: number,
    @Body() testObjectDto: TestObjectDto,
  ) {
    return this.testObjectService.updateTestObject(id, testObjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.testObjectService.deleteTestOjbect(+id);
  }
}
