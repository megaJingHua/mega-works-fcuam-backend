/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString  } from 'class-validator';
export class CreateNavbarchildernDto {
    @ApiProperty({ description: 'name' ,example:'系史'})
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'url' ,example:'/history'})
    @IsString()
    readonly url: string;
}
