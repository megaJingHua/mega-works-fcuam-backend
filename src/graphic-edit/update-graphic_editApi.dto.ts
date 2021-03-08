/* eslint-disable prettier/prettier */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
import { CreateImg_img_graphic_editDto } from './create-img_graphic_edit.dto';
export class UpdateGraphic_editApiDto {
  @ApiProperty({ description: 'type', example: 6 })
  @IsInt()
  type: number;

  @ApiProperty({
    description: 'title',
    example: '恭喜「2019商業模式與大數據分析競賽」獲獎',
  })
  @IsString()
  title: string;

  @ApiHideProperty()
  @IsString()
  updatetime: string;

  @ApiProperty({
    description: 'content',
    example:
      '恭喜林英志、陳亭甫老師指導本系學生<br><br>【好運急數來】：蕭孟平、陳林泰、陳昶霓、童子祐<br>【嬰數花再提煉】：劉博弘、張家瑋、黃芝音、陳宏羲<br><br>參加「2019第二屆商業模式與大數據分析競賽-人工智慧金融挑戰賽」獲得優選。網址：<a href="https://bba.cm.nsysu.edu.tw/">https://bba.cm.nsysu.edu.tw/</a>| 可寫html標籤',
  })
  @IsString()
  content: string;

  @ApiProperty({
    required: false,
    description: '沒有Url代表刪掉原來的圖片',
    example: 'http://127.0.0.1:3000/public/1614844869055-main.jpg',
  })
  @IsString()
  url: string;

  @ApiProperty({
    required: false,
    description: 'img',
    type: 'string',
    format: 'binary',
  })
  img: CreateImg_img_graphic_editDto;
}