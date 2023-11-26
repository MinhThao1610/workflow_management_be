import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TimService } from './tim.service';
import { CreateTimDto } from './dto/create-tim.dto';
import { UpdateTimDto } from './dto/update-tim.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import Role from 'src/auth/role/role.enum';
import { FilterTimDto } from './dto/filter-tim.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('tim')
export class TimController {
  constructor(private readonly timService: TimService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SystemAdmin, Role.Admin)
  @Post('create')
  create(@Body() createTimDto: CreateTimDto) {
    return this.timService.createTim(createTimDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-list')
  findAll(@Query() filter: FilterTimDto) {
    return this.timService.getTimList(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.timService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTimDto: UpdateTimDto,
    @GetUser() user: any,
  ) {
    return this.timService.update(+id, updateTimDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timService.remove(+id);
  }
}
