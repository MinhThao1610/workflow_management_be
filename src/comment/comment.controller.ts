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
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() commentDto: CommentDto) {
    return this.commentService.createComment(commentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  getComments(
    @Query() pagination: PaginationDto, // Phần phân trang sử dụng PaginationDto
    @Query() milestoneId: number,
  ) {
    return this.commentService.getComment(pagination, milestoneId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOneComment(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateComment(@Param('id') id: number, @Body() commentDto: CommentDto) {
    return this.commentService.updateComment(id, commentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.commentService.deleteComment(+id);
  }
}
