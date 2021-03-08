/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class FindoneFormat {
 @ApiProperty({description:'單一頁尾資料'})
  @IsString()
  readonly role: string;
  
}
