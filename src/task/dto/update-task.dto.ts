import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  task_date: string;

  @IsNotEmpty()
  no_handphone: string;

  @IsNotEmpty()
  done: string;

  @IsNotEmpty()
  doing: string;

  @IsNotEmpty()
  to_do: string;

  @IsNotEmpty()
  blocker: string;
}
