/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class FindAllFormat {
  @ApiProperty({ description: 'title 標題' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'email 電子郵件' })
  @IsString()
  readonly email: string;
  @ApiProperty({ description: 'service_hours' })
  @IsString()
  readonly service_hours: string;
  @ApiProperty({ description: 'copyright' })
  @IsString()
  readonly copyright: string;
  @ApiProperty({ description: 'updated' })
  @IsString()
  readonly updated: string;
  @ApiProperty({ description: 'address' })
  @IsString()
  readonly address: string;
  @ApiProperty({ description: 'title' })
  @IsString()
  readonly facebook: string;
  @ApiProperty({ description: 'phone' })
  @IsString()
  readonly phone: string;
}
