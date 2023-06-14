import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from '../schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Users.name, schema:UsersSchema}]), DepartmentModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
