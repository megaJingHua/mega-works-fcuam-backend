/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
import { CreateNavbarchildernDto } from './create-navbarchildern.dto';
export class CreateNavbarDto {
  @ApiProperty({ description: 'id', example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'name', example: '關於本系' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'url', example: '/about' })
  @IsString()
  readonly url: string;
  @ApiProperty({
    description: 'childern',
    example: "[{'name':'系史','url':'/history'},{'name':'系史2','url':'/history2'}] 雙引號拿掉變成陣列  ,單引號變雙引號",
    type: [CreateNavbarchildernDto],
  })
  @IsString()
  readonly childern: CreateNavbarchildernDto[];
}
