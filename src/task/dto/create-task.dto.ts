import { IsInt, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  user_name:string;

  @IsNotEmpty()
  task_date:string;

  @IsNotEmpty()
  no_handphone:string;

  @IsNotEmpty()
  done:string;

  @IsNotEmpty()
  doing:string;

  @IsNotEmpty()
  to_do:string;

  @IsNotEmpty()
  blocker:string;
}
