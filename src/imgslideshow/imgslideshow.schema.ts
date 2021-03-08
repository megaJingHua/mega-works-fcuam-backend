/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CreateImg_slideshowDto } from './create-img_slideshow.dto';
export type ImgSlideshowDocument = ImgSlideshow & Document;

@Schema()
export class ImgSlideshow {
  @Prop({ required: true })
  type: number;

  @Prop()
  title: string;

  @Prop()
  type_name: string;

  @Prop()
  updatetime: string;

  @Prop()
  img: CreateImg_slideshowDto;
}
export const ImgSlideshowSchema = SchemaFactory.createForClass(ImgSlideshow);
