/* eslint-disable prettier/prettier */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class CreateVideoSlideshowDto {
  @ApiProperty({ description: 'type', example: 6 })
  @IsInt()
  type: number;

  @ApiProperty({ description: 'type_name',example:'類別名稱' })
  @IsString()
  type_name: string;

  @ApiProperty({ description: 'title',example:'影片名稱' })
  @IsString()
  title: string;

  @ApiHideProperty()
  updatetime: string;

  @ApiProperty({ description: 'url',example:'https://www.youtube.com/watch?v=AMEv4ncoQxg&list=RDAMEv4ncoQxg&index=1' })
  @IsString()
  url: string;
}
