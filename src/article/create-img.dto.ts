/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateImgDto {
  @ApiProperty({
    description: 'real_name',
    example: '1614843266819-card1.svg',
  })
  @IsString()
  real_name: string;
  @ApiProperty({
    description: 'url',
    example: 'http://127.0.0.1:3000/public/1614843266819-card1.svg',
  })
  @IsString()
  url: string;
}
