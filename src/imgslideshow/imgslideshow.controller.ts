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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import multer = require('multer');
import { CreateImgSlideshowDto } from './create-imgslideshow.dto';
import { ImgslideshowService } from './imgslideshow.service';
import { UpdateImgSlideshowDto } from './update-imgslideshow.dto';
import { env } from 'process';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/user_role/roles.decorator';
import { Role } from 'src/user_role/role.enum';
import { RolesGuard } from 'src/user_role/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateImgSlideshowApiDto } from './update-imgslideshowApi.dto';

@ApiTags('圖片輪播')
@Controller('imgslideshow')
export class ImgslideshowController {
  constructor(private imgSlideshowService: ImgslideshowService) {}

  @ApiOperation({
    summary: '取得Type圖片輪播資料',
    description: '取得Type圖片輪播資料',
  })
  @ApiParam({ name: 'type', description: '' })
  @ApiOkResponse({
    description: '取得Type圖片輪播資料',
    type: CreateImgSlideshowDto,
  })
  @Get(':type')
  async getall(@Param() params, @Res() res): Promise<string[]> {
    const data = await this.imgSlideshowService.find(parseInt(params.type));
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiOperation({
    summary: '刪除單一資料',
    description: '刪除單一資料',
  })
  @ApiParam({ name: 'objectid', description: '' })
  @ApiOkResponse({
    description: '刪除單一資料',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':objectid')
  async deleteone(@Param() params, @Res() res): Promise<any> {
    const result = await this.imgSlideshowService.deleteOne(params.objectid);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @ApiOperation({
    summary: '修改一筆圖片輪播',
    description: '修改一筆圖片輪播',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'objectid', description: '60407a84144e9da9a8d89d14' })
  @ApiBody({
    description: '修改一筆圖片輪播',
    type: UpdateImgSlideshowApiDto,
  })
  @ApiCreatedResponse({
    description: '連結成功建立,其實就是201狀態的描述',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':objectid')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../uploadfiles'));
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async uploadFile_updateImgSlideshow(
    @UploadedFile() img,
    @Body() input_data: UpdateImgSlideshowDto,
    @Res() res,
    @Param() params,
  ) {
    const ImgSildeshow_data: UpdateImgSlideshowDto = input_data;
    const baseurl = env.app_url_public; // global.app_url_public;
    const data = await this.imgSlideshowService.updateone(
      ImgSildeshow_data,
      img,
      baseurl,
      params.objectid,
    );

    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }

  @ApiOperation({
    summary: '新增一筆圖片輪播資料',
    description: '新增一筆圖片輪播資料',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '新增一筆圖片輪播資料',
    type: CreateImgSlideshowDto,
  })
  @ApiCreatedResponse({
    description: '連結成功建立,其實就是201狀態的描述',
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '../uploadfiles'));
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async uploadFile_createImgSlideshow(
    @UploadedFile() img,
    @Body() input_data: CreateImgSlideshowDto,
    @Res() res,
  ) {
    const ImgSildeshow_data: CreateImgSlideshowDto = input_data;
    const baseurl = env.app_url_public; //global.app_url_public;
    const data = await this.imgSlideshowService.create(
      ImgSildeshow_data,
      img,
      baseurl,
    );

    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }
}
