import { Module } from '@nestjs/common';
import { TestObjectService } from './testObject.service';
import { TestObjectController } from './testObject.controller';

@Module({
  controllers: [TestObjectController],
  providers: [TestObjectService],
})
export class TestObjectModule {}
