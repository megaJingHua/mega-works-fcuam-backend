/* eslint-disable prettier/prettier */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
import { CreateImg_slideshowDto } from './create-img_slideshow.dto';
export class UpdateImgSlideshowApiDto {
  @ApiProperty({ description: 'type', example: 1 })
  @IsInt()
  type: number;

  @ApiProperty({ description: 'type_name', example: '類別名稱' })
  @IsString()
  type_name: string;

  @ApiProperty({ description: 'title', example: '圖片名稱' })
  @IsString()
  title: string;

  @ApiHideProperty()
  @IsString()
  updatetime: string;

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
  img: CreateImg_slideshowDto;
}
