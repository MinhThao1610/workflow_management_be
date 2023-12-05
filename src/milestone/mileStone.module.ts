import { Module } from '@nestjs/common';
import { MileStoneController } from './mileStone.controller';
import { MileStoneService } from './mileStone.service';

@Module({
  controllers: [MileStoneController],
  providers: [MileStoneService],
})
export class MileStoneModule {}
