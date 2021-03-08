/* eslint-disable prettier/prettier */
import { IsString  } from 'class-validator';
export class CreateImg_slideshowDto {
 
    @IsString()
     real_name: string;
    @IsString()
     url: string;
}
