import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({required:true})
  user_name:string;

  @Prop()
  task_date:string;

  @Prop()
  no_handphone:string;

  @Prop()
  done:string;

  @Prop()
  doing:string;

  @Prop()
  to_do:string;

  @Prop()
  blocker:string;

  @Prop({type:Date, default:Date.now})
  created_at:Date

  @Prop({type:Date, default:Date.now})
  updated_at:Date


}

export const TaskSchema = SchemaFactory.createForClass(Task);
