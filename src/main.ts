import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Load các biến môi trường từ file .env vào process.env

  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Tự động biến đổi dữ liệu được gửi đến DTO
      whitelist: true, // Bỏ qua các thuộc tính không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Gây lỗi nếu có thuộc tính không được định nghĩa trong DTO
    }),
  );
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  // app.useStaticAssets('/home/tdauetxy/chamcong_nestjs/chamcong_backend_nestjs/public', {
  //   prefix: '/public/',
  // });
  await app.listen(process.env.PORT || 3456);
}
bootstrap();
