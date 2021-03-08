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
import { GraphicEditService } from './graphic-edit.service';
import multer = require('multer');
import { join } from 'path';
import { Creategraphic_editDto } from './create-graphic_edit.dto';
import { UpdateGraphic_editDto } from './update-graphic_edit.dto';
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
import { Graphic_edit } from './graphic_edit.schema';
import { Roles } from 'src/user_role/roles.decorator';
import { RolesGuard } from 'src/user_role/roles.guard';
import { Role } from 'src/user_role/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateGraphic_editApiDto } from './update-graphic_editApi.dto';

@ApiTags('圖文')
@Controller('graphic-edit')
export class GraphicEditController {
  constructor(private graphicEditService: GraphicEditService) {}

  @ApiOperation({
    summary: '取得Type圖文資料',
    description: '取得Type圖文資料',
  })
  @ApiParam({ name: 'type', description: '' })
  @ApiOkResponse({
    description: '取得Type圖文資料',
    type: Creategraphic_editDto,
  })
  @Get(':type')
  async getall(@Param() params, @Res() res): Promise<string[]> {
    const data = await this.graphicEditService.find(parseInt(params.type));
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
    const result = await this.graphicEditService.deleteOne(params.objectid);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @ApiOperation({
    summary: '修改一筆圖文資料(含一個圖片)',
    description: '修改一筆圖文資料(含一個圖片)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'objectid', description: '60407a84144e9da9a8d89d14' })
  @ApiBody({
    description: '修改一筆圖文資料(含一個圖片)',
    type: UpdateGraphic_editApiDto,
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
  async uploadFile_updateGraphic_edit(
    @UploadedFile() img,
    @Body() input_data: UpdateGraphic_editDto,
    @Res() res,
    @Param() params,
  ) {
    const Graphic_edit_data: UpdateGraphic_editDto = input_data;
    const baseurl = env.app_url_public; // global.app_url_public;
    const data = await this.graphicEditService.updateone(
      Graphic_edit_data,
      img,
      baseurl,
      params.objectid,
    );

    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }

  @ApiOperation({
    summary: '新增一筆圖文資料(含一個圖片)',
    description: '新增一筆圖文資料(含一個圖片)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '新增一筆圖文資料(含一個圖片)',
    type: Graphic_edit,
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
  async uploadFile_createGraphic_edit(
    @UploadedFile() img,
    @Body() input_data: Creategraphic_editDto,
    @Res() res,
  ) {
    const ImgSildeshow_data: Creategraphic_editDto = input_data;
    const baseurl = env.app_url_public; // global.app_url_public;
    const data = await this.graphicEditService.create(
      ImgSildeshow_data,
      img,
      baseurl,
    );

    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }
}
