/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Img } from './img.schema';
import { File } from './file.schema';
import { CreateImgDto } from './create-img.dto';
import { CreateFileDto } from './create-file.dto';
export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  type: number;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  updatetime: string;

  @Prop([CreateImgDto])
  imgs: CreateImgDto[];

  @Prop([CreateFileDto])
  files: CreateFileDto[];
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
