/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class LoginFormat {
 @ApiProperty({description:'使用者名稱',example:'ivan'})
  @IsString()
  readonly username: string;

  @ApiProperty({description:'密碼' ,example:'1234'})
  @IsString()
  readonly password: string;
  
}