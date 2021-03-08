/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

export type VideoslideshowDocument = Videoslideshow & Document;

@Schema()
export class Videoslideshow {
  @Prop({ required: true })
  type: number;

  @Prop()
  type_name: string;

  @Prop()
  title: string;

  @Prop()
  updatetime: string;

  @Prop()
  url: string;
  
}
export const VideoslideshowSchema = SchemaFactory.createForClass(Videoslideshow);
