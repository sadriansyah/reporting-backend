import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname:string;

  @IsNotEmpty()
  @IsEmail()
  email:string;

  @IsNotEmpty()
  handphone:string;

  @IsNotEmpty()
  level:string;

  @IsNotEmpty()
  department_id:string;
}
