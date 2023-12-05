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
import { MileStoneService } from './mileStone.service';
import { MileStoneDto } from './dto/MileStone.dto';

@Controller('mileStone')
export class MileStoneController {
  constructor(private readonly mileStoneService: MileStoneService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() mileStoneDto: MileStoneDto) {
    return this.mileStoneService.createMileStone(mileStoneDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  getMileStones(
    @Query() pagination: PaginationDto, // Phần phân trang sử dụng PaginationDto
    @Query() company_id: number,
    @Query() employee_id: number,
  ) {
    return this.mileStoneService.getMileStone(
      pagination,
      company_id,
      employee_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.mileStoneService.findOneMileStone(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateMileStone(@Param('id') id: number, @Body() mileStoneDto: MileStoneDto) {
    return this.mileStoneService.updateMileStone(id, mileStoneDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.mileStoneService.deleteMileStone(+id);
  }
}
