/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop()
  name: string;
  @Prop()
  real_name: string;

  @Prop()
  url: string;
}
export const FileSchema = SchemaFactory.createForClass(File);
