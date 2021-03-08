/* eslint-disable prettier/prettier */
import { IsString  } from 'class-validator';
export class CreateImg_img_graphic_editDto {
 
    @IsString()
     real_name: string;
    @IsString()
     url: string;
}
