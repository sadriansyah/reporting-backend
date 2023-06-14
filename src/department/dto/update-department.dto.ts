import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsNotEmpty()
  department_name:string;

  @IsNotEmpty()
  department_abbreviation:string;
}
