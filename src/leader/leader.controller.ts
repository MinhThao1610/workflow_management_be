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
import { LeaderService } from './leader.service';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { UpdateLeaderDto } from './dto/update-leader.dto';
import { FilterLeaderDto } from './dto/filter-leader.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import Role from 'src/auth/role/role.enum';

@Controller('leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SystemAdmin)
  @Post('create')
  create(@Body() createLeaderDto: CreateLeaderDto) {
    return this.leaderService.create(createLeaderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  findAll(@Query() filterLeaderDto: FilterLeaderDto) {
    return this.leaderService.findAll(filterLeaderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.leaderService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.SystemAdmin)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLeaderDto: UpdateLeaderDto) {
    return this.leaderService.update(+id, updateLeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaderService.remove(+id);
  }
}
