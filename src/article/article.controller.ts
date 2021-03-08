import {
  Controller,
  Body,
  UseInterceptors,
  Post,
  UploadedFiles,
  Res,
  Param,
  Get,
  HttpStatus,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import multer = require('multer');
import * as fs from 'fs';
import { CreateArticleDto } from './create-article.dto';
import { ArticlePipe } from './article.pipe';
import { CreateImgDto } from './create-img.dto';
import { CreateFileDto } from './create-file.dto';
import { ArticleService } from './article.service';
import { UpdateArticleDto } from './update-article.dto';
import { Roles } from 'src/user_role/roles.decorator';
import { Role } from 'src/user_role/role.enum';
import { RolesGuard } from 'src/user_role/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
const file_type = 'imgs';
const file_type2 = 'files';

@ApiTags('文章編輯')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({
    summary: '取得文章資料',
    description: '取得文章資料',
  })
  @ApiParam({ name: 'objectid', description: '' })
  @ApiOkResponse({
    description: '取得文章資料',
    type: CreateArticleDto,
  })
  @Get(':objectid')
  async getoneArticle(@Param() params, @Res() res): Promise<string[]> {
    const data = await this.articleService.findone(params.objectid);
    return res.status(HttpStatus.OK).json(data);
  }

  @ApiOperation({
    summary: '取得全部文章資料',
    description: '取得全部文章資料',
  })
  @ApiParam({ name: '不用參數', required: false })
  @ApiOkResponse({
    description: '取得全部文章資料',
    type: [CreateArticleDto],
  })
  @Get()
  async getallArticle(@Param() params, @Res() res): Promise<string[]> {
    const data = await this.articleService.findall();
    return res.status(HttpStatus.OK).json(data);
  }
  /*
  @Get('download/:file')
  getFile(@Res() res: Response, @Param() params): string {
    console.log('xxx', params);
    res.download(join(__dirname, '/uploadfiles/', params.file), 'dddd.xlt');
    return '下载成功';
  }
  */
  //需有權限才能存取
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
    const result = await this.articleService.deleteOne(params.objectid);
    return res.status(HttpStatus.CREATED).json(result);
  }

  //需有權限才能存取
  @ApiOperation({
    summary: '修改一筆文章資料(含複數圖片及複數檔案)',
    description: '修改一筆文章資料(含複數圖片及複數檔案)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'objectid', description: '60407a84144e9da9a8d89d14' })
  @ApiBody({
    description: '修改一筆文章資料(含複數圖片及複數檔案)',
    type: UpdateArticleDto,
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
    FileFieldsInterceptor([{ name: file_type }, { name: file_type2 }], {
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
  async updateone(
    @UploadedFiles() files,
    @Res() res,
    @Param() params,
    @Body() input_data: any,
  ): Promise<any> {
    const article_data_update: UpdateArticleDto = new UpdateArticleDto();
    article_data_update.type = parseInt(input_data.type);
    article_data_update.title = input_data.title;
    article_data_update.content = input_data.content;
    ///要把delete_img_url 變成array
    if (typeof input_data.delete_img_url != 'string') {
      article_data_update.delete_img_url = input_data.delete_img_url;
    } else {
      article_data_update.delete_img_url = new Array<string>();
      article_data_update.delete_img_url.push(input_data.delete_img_url);
    }
    /////end
    ///要把delete_file_url 變成array
    if (typeof input_data.delete_file_url != 'string') {
      article_data_update.delete_file_url = input_data.delete_file_url;
    } else {
      article_data_update.delete_file_url = new Array<string>();
      article_data_update.delete_file_url.push(input_data.delete_file_url);
    }
    ///end
    article_data_update.id = params.objectid;
    const imgs = files.imgs;
    const files_data = files.files;
    const baseurl = env.app_url_public; // global.app_url_public;
    const filepath = join(__dirname, '../uploadfiles');

    const data = await this.articleService.updateone(
      article_data_update,
      imgs,
      files_data,
      baseurl,
      filepath,
    );
    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }

  //需有權限才能存取
  @ApiOperation({
    summary: '新增一筆文章資料(含複數圖片及複數檔案)',
    description: '新增一筆文章資料(含複數圖片及複數檔案)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '新增一筆文章資料(含複數圖片及複數檔案)',
    type: CreateArticleDto,
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
    FileFieldsInterceptor([{ name: file_type }, { name: file_type2 }], {
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
  async uploadFile_createArticle(
    @UploadedFiles() files,
    @Body(/*new ArticlePipe()*/) input_data: CreateArticleDto,
    @Res() res,
  ) {
    const article_data: CreateArticleDto = input_data;
    article_data.type = Number(article_data.type);
    const imgs = files.imgs;
    const files_data = files.files;
    const baseurl = env.app_url_public; // global.app_url_public;
    const filepath = join(__dirname, '../uploadfiles');

    const data = await this.articleService.create(
      article_data,
      imgs,
      files_data,
      baseurl,
      filepath,
    );

    if (data != null || data != undefined) {
      return res.status(HttpStatus.CREATED).json(data);
    }
  }
}
