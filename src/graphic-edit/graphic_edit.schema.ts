/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { CreateImg_img_graphic_editDto } from './create-img_graphic_edit.dto';
export type Graphic_editDocument = Graphic_edit & Document;

@Schema()
export class Graphic_edit {
  @ApiProperty({ description: 'type' ,example:6})
  @Prop({ required: true })
  type: number;

  @ApiProperty({ description: 'title' ,example:'恭喜「2019商業模式與大數據分析競賽」獲獎'})
  @Prop()
  title: string;

  @ApiHideProperty()
  @Prop()
  updatetime: string;

  @ApiProperty({ description: 'content' ,example:'恭喜林英志、陳亭甫老師指導本系學生<br><br>【好運急數來】：蕭孟平、陳林泰、陳昶霓、童子祐<br>【嬰數花再提煉】：劉博弘、張家瑋、黃芝音、陳宏羲<br><br>參加「2019第二屆商業模式與大數據分析競賽-人工智慧金融挑戰賽」獲得優選。網址：<a href=\"https://bba.cm.nsysu.edu.tw/\">https://bba.cm.nsysu.edu.tw/</a>| 可寫html標籤'})
  @Prop()
  content: string;

  @ApiProperty({description: 'img', type: 'string', format: 'binary' })
  @Prop()
  img: CreateImg_img_graphic_editDto;
}
export const Graphic_editSchema = SchemaFactory.createForClass(Graphic_edit);
