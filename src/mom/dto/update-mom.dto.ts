import { IsNotEmpty } from 'class-validator';

export class UpdateMomDto {
  @IsNotEmpty()
  meeting_creator: string;

  @IsNotEmpty()
  meeting_number: string;

  @IsNotEmpty()
  meeting_project_id: string;

  @IsNotEmpty()
  to_email: string;

  @IsNotEmpty()
  cc_email: string;

  @IsNotEmpty()
  date_and_time: Date;

  @IsNotEmpty()
  meeting_organizer: string;

  @IsNotEmpty()
  meeting_draft_dated: Date;

  @IsNotEmpty()
  meeting_location: string;

  @IsNotEmpty()
  meeting_chair: string;

  @IsNotEmpty()
  meeting_title: string;

  @IsNotEmpty()
  meeting_summary: string;

  @IsNotEmpty()
  meeting_attachment: string;

  @IsNotEmpty()
  meeting_dibuat: string;

  @IsNotEmpty()
  meeting_mengetahui: string;

  @IsNotEmpty()
  existing_attachment: string;
}
