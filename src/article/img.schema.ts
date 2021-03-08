/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ImgDocument = Img & Document;

@Schema()
export class Img {
  @Prop()
  real_name: string;

  @Prop()
  url: string;
}
export const ImgSchema = SchemaFactory.createForClass(Img);
