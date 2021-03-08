import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user_role/role.enum';
import { Roles } from 'src/user_role/roles.decorator';
import { RolesGuard } from 'src/user_role/roles.guard';
import { CreateVideoSlideshowDto } from './create-videoslideshow.dto';
import { VideoslideshowPipe } from './videoslideshow.pipe';
import { VideoslideshowService } from './videoslideshow.service';

@Controller('videoslideshow')
export class VideoslideshowController {
  constructor(private videoslideshowService: VideoslideshowService) {}

  @ApiOperation({
    summary: '刪除單一資料',
    description: '刪除單一資料',
  })
  @ApiParam({ name: 'id', description: '' })
  @ApiOkResponse({
    description: '刪除單一資料',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteone(@Param() params, @Res() res): Promise<any> {
    const result = await this.videoslideshowService.deleteOne(params.id);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @ApiOperation({
    summary: '取得Type影片輪播資料',
    description: '取得Type影片輪播資料',
  })
  @ApiParam({ name: 'type', description: '' })
  @ApiOkResponse({
    description: '取得Type影片輪播資料',
    type: CreateVideoSlideshowDto,
  })
  @Get(':type')
  async getall(@Param() params, @Res() res): Promise<string[]> {
    const data = await this.videoslideshowService.findtype(params.type);
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiOperation({
    summary: '修改一筆影片輪播',
    description: '修改一筆影片輪播',
  })
  @ApiParam({ name: 'id', description: '60407a84144e9da9a8d89d14' })
  @ApiBody({
    description: '修改一筆影片輪播',
    type: CreateVideoSlideshowDto,
  })
  @ApiCreatedResponse({
    description: '連結成功建立,其實就是201狀態的描述',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateone(
    @Param() params,
    @Res() res,
    @Body(new VideoslideshowPipe()) input_data: CreateVideoSlideshowDto,
  ): Promise<any> {
    const video_data: CreateVideoSlideshowDto = input_data;
    const result = await this.videoslideshowService.updateone(
      params.id,
      video_data,
    );
    return res.status(HttpStatus.CREATED).json(result);
  }

  @ApiOperation({
    summary: '新增影片輪播資料',
    description: '新增影片輪播資料',
  })
  @ApiBody({ type: CreateVideoSlideshowDto })
  @ApiCreatedResponse({
    description: '連結成功建立,其實就是201狀態的描述',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async addData(
    @Param() params,
    @Res() res,
    @Body(new VideoslideshowPipe()) input_data: CreateVideoSlideshowDto,
  ): Promise<any> {
    const video_data: CreateVideoSlideshowDto = input_data;
    const data = await this.videoslideshowService.create(video_data);

    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }
}
