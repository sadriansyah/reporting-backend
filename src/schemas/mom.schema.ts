import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MomDocument = Mom & Document;

@Schema()
export class Mom {
  @Prop()
  meeting_creator: string;

  @Prop()
  meeting_number: string;

  @Prop()
  meeting_project_id: string;

  @Prop()
  to_email: string;

  @Prop()
  cc_email: string;

  @Prop({ required: true })
  date_and_time: Date;

  @Prop()
  meeting_organizer: string;

  @Prop()
  meeting_draft_dated: Date;

  @Prop()
  meeting_location: string;

  @Prop()
  meeting_chair: string;

  @Prop()
  meeting_title: string;

  @Prop()
  meeting_summary: string;

  @Prop()
  meeting_attachment: string;

  @Prop()
  meeting_dibuat: string;

  @Prop()
  meeting_mengetahui: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const MomSchema = SchemaFactory.createForClass(Mom);
