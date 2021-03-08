/* eslint-disable prettier/prettier */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, } from 'class-validator';
import { CreateImg_slideshowDto } from './create-img_slideshow.dto';
export class CreateImgSlideshowDto {
  @ApiProperty({ description: 'type' ,example:1})
  @IsInt()
  type: number;

  @ApiProperty({ description: 'type_name' ,example:'類別名稱'})
  @IsString()
  type_name: string;

  @ApiProperty({ description: 'title' ,example:'圖片名稱'})
  @IsString()
  title: string;

  @ApiHideProperty()
  @IsString()
  updatetime: string;

  @ApiProperty({description: 'img', type: 'string', format: 'binary' })
  img: CreateImg_slideshowDto;
}
