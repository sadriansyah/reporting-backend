import { IsInt, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProjectDto {
  @IsNotEmpty()
  project_name:string;

  @IsNotEmpty()
  project_company:string;

  @IsNotEmpty()
  project_prefix:string;

  @IsNotEmpty()
  project_pic:string;

  @IsNotEmpty()
  @IsEmail()
  project_email:string;

  @IsNotEmpty()
  project_contact:string;

}
