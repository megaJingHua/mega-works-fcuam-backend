/* eslint-disable prettier/prettier */
import { IsString, IsInt } from 'class-validator';
export class UpdateImgSlideshowDto {
  @IsInt()
  type: number;

  @IsString()
  type_name: string;

  @IsString()
  title: string;

  @IsString()
  updatetime: string;

  @IsString()
  url: string;
}
