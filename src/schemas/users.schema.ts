import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({required:true})
  fullname:string;

  @Prop()
  email:string;

  @Prop()
  password:string;

  @Prop()
  salt:string;

  @Prop()
  handphone:string;

  @Prop()
  level:string;

  @Prop()
  signature:string;

  @Prop()
  department_id:string;

  @Prop({type:Date, default:Date.now})
  created_at:Date

  @Prop({type:Date, default:Date.now})
  updated_at:Date

}

export const UsersSchema = SchemaFactory.createForClass(Users);
