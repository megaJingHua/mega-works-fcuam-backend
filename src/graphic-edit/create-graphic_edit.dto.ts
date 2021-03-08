/* eslint-disable prettier/prettier */
import { IsString, IsInt } from 'class-validator';
import { CreateImg_img_graphic_editDto } from './create-img_graphic_edit.dto';
export class Creategraphic_editDto {
  @IsInt()
  type: number;

  @IsString()
  title: string;

  @IsString()
  updatetime: string;

  @IsString()
  content: string;

  img: CreateImg_img_graphic_editDto;
}
