import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomModule } from './mom/mom.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { PuppeteerModule } from 'nest-puppeteer';
import { UsersModule } from './users/users.module';
import { DepartmentModule } from './department/department.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ConfigModule.forRoot(),MomModule,MongooseModule.forRoot(process.env.MONGODB_URI), ProjectModule,
      MulterModule.register({
        dest:'./uploads',
      }),
      MailModule, UsersModule, DepartmentModule, AuthModule , TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
