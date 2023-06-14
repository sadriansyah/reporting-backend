import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({required:true})
  project_name:string;

  @Prop()
  project_company:string;

  @Prop()
  project_prefix:string;

  @Prop()
  project_pic:string;

  @Prop()
  project_email:string;

  @Prop()
  project_contact:string;

  @Prop({type:Date, default:Date.now})
  created_at:Date

  @Prop({type:Date, default:Date.now})
  updated_at:Date


}

export const ProjectSchema = SchemaFactory.createForClass(Project);
