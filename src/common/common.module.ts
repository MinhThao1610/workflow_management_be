import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [SwaggerModule, ConfigModule],
})
export class CommonModule {}
