import { Module } from '@nestjs/common';
import { TimService } from './tim.service';
import { TimController } from './tim.controller';

@Module({
  controllers: [TimController],
  providers: [TimService]
})
export class TimModule {}
