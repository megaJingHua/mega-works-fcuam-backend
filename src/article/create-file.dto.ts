/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateFileDto {
  @ApiProperty({
    description: 'name',
    example: 'iconfinder_payment_method_card_visa_206684.svg',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'real_name',
    example: '1614843321549-iconfinder_payment_method_card_visa_206684.svg',
  })
  @IsString()
  real_name: string;

  @ApiProperty({
    description: 'url',
    example:
      'http://127.0.0.1:3000/public/1614843321549-iconfinder_payment_method_card_visa_206684.svg',
  })
  @IsString()
  url: string;
}
