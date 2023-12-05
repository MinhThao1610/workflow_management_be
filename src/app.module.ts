import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { TimModule } from './tim/tim.module';
import { TestObjectModule } from './testObject/testObject.module';
import { TestcaseModule } from './testcase/testcase.module';
import { MileStoneModule } from './milestone/mileStone.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailerModule.forRoot({
      transport: {
        host: 'mail.tda-uet.xyz',
        port: 465,

        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_SEND_OTP, // generated ethereal user
          pass: process.env.PASSWORD_SEND_OTP, // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    CompanyModule,
    EmployeeModule,
    TimModule,
    TestObjectModule,
    TestcaseModule,
    MileStoneModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
