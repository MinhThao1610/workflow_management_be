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
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() likeDto: LikeDto) {
    return this.likeService.createLike(likeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  getLikes(
    @Query() pagination: PaginationDto, // Phần phân trang sử dụng PaginationDto
    @Query() milestoneId: number,
  ) {
    return this.likeService.getLike(pagination, milestoneId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOneLike(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateLike(@Param('id') id: number, @Body() likeDto: LikeDto) {
    return this.likeService.updateLike(id, likeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.likeService.deleteLike(+id);
  }
}
