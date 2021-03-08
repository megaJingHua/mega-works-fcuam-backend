/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class CreateFooterDto {
  @ApiProperty({ description: 'id' ,example:1})
  @IsInt()
  id: number;

  @ApiProperty({ description: 'role',example:'title' })
  @IsString()
  readonly role: string;

  @ApiProperty({ description: 'context',example:'測試' })
  @IsString()
  readonly context: string;
}
