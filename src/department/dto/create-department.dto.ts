import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  department_name: string;

  @IsNotEmpty()
  department_abbreviation: string;
}
