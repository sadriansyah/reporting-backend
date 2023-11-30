import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  project_company: string;

  @IsNotEmpty()
  project_prefix: string;

  @IsNotEmpty()
  project_pic: string;

  @IsNotEmpty()
  @IsEmail()
  project_email: string;

  @IsNotEmpty()
  project_contact: string;
}
