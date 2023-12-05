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
import { LibService } from './lib.service';
import { LibDto } from './dto/lib.dto';

@Controller('lib')
export class LibController {
  constructor(private readonly libService: LibService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() libDto: LibDto) {
    return this.libService.createLib(libDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  getLibs(
    @Query() pagination: PaginationDto, // Phần phân trang sử dụng PaginationDto
    @Query() company_id: number,
    @Query() type: string,
    @Query() createAt: Date,
  ) {
    return this.libService.getLib(pagination, company_id, type, createAt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.libService.findOneLib(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateLib(@Param('id') id: number, @Body() libDto: LibDto) {
    return this.libService.updateLib(id, libDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.libService.deleteLib(+id);
  }
}
