import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { CreateImgDto } from './create-img.dto';
import { CreateFileDto } from './create-file.dto';
import { CreateArticleDto } from './create-article.dto';
import * as fs from 'fs';
import { join } from 'path';
import { UpdateArticleDto } from './update-article.dto';
const file_basepath = join(__dirname, '../uploadfiles');

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private ArticleModel: Model<ArticleDocument>,
  ) {}
  async findall(): Promise<any> {
    const article_data = await this.ArticleModel.find({}).exec();

    return article_data;
  }
  async findone(object_id: string): Promise<any> {
    const article_data = await this.ArticleModel.findOne({
      _id: object_id,
    }).exec();

    return article_data;
  }
  async deleteOne(object_id: string): Promise<any> {
    let i = 0;

    const article_data = await this.ArticleModel.findOne({
      _id: object_id,
    }).exec();

    const delete_data = this.ArticleModel.deleteOne({
      _id: object_id,
    }).exec();
    try {
      //////轉換成參數確認有值
      let article_img__i = 0;

      if (article_data.imgs != null || article_data.imgs != undefined) {
        article_img__i = article_data.imgs.length;
      }
      let delete_file__j = 0;

      if (article_data.files != null || article_data.files != undefined) {
        delete_file__j = article_data.files.length;
      }
      ////

      ///刪除以上傳圖片
      for (i = 0; i < article_img__i; i++) {
        fs.unlinkSync(join(file_basepath, article_data.imgs[i].real_name));
      }
      //刪除以上傳的檔案
      for (i = 0; i < delete_file__j; i++) {
        fs.unlinkSync(join(file_basepath, article_data.files[i].real_name));
      }
    } catch {}

    return await delete_data;
  }
  async updateone(
    updateArticleDto: UpdateArticleDto,
    imgs: any,
    files: any,
    baseurl: string,
    filepath: string,
  ): Promise<any> {
    let i = 0;
    let j = 0;
    try {
      const article_data = await this.ArticleModel.findOne({
        _id: updateArticleDto.id,
      }).exec();
      //替換計算的變數
      let article_img_data_i = 0;
      let delete_img_url_j = 0;

      if (
        article_data.imgs.length != null ||
        article_data.imgs.length != undefined
      ) {
        article_img_data_i = article_data.imgs.length;
      }
      ////
      if (
        updateArticleDto.delete_img_url != null ||
        updateArticleDto.delete_img_url != undefined
      ) {
        delete_img_url_j = updateArticleDto.delete_img_url.length;
      }
      //找出Article 之後，如果有刪除的檔案或是圖片將資料庫的資刪除後，刪除真的檔案
      //img雙層迴圈 第一層是資料庫的陣列，第二層是需刪的陣列

      for (i = 0; i < article_img_data_i; i++) {
        for (j = 0; j < delete_img_url_j; j++) {
          if (article_data.imgs[i].url == updateArticleDto.delete_img_url[j]) {
            fs.unlinkSync(join(file_basepath, article_data.imgs[i].real_name));
            article_data.imgs.splice(i);
            if (i != 0) {
              i = i - 1;
              article_img_data_i = article_img_data_i - 1;
            }
          }
        }
      }
      //替換計算的變數
      let article_flie_data_i = 0;
      let delete_flie_url_j = 0;

      if (
        article_data.files.length != null ||
        article_data.files.length != undefined
      ) {
        article_flie_data_i = article_data.files.length;
      }
      ////
      if (
        updateArticleDto.delete_file_url != null ||
        updateArticleDto.delete_file_url != undefined
      ) {
        delete_flie_url_j = updateArticleDto.delete_file_url.length;
      }
      //file雙層迴圈 第一層是資料庫的陣列，第二層是需刪的陣列
      for (i = 0; i < article_flie_data_i; i++) {
        for (j = 0; j < delete_flie_url_j; j++) {
          if (
            article_data.files[i].url == updateArticleDto.delete_file_url[j]
          ) {
            fs.unlinkSync(join(file_basepath, article_data.files[i].real_name));
            article_data.files.splice(i);
            if (i != 0) {
              i = i - 1;
              article_flie_data_i = article_flie_data_i - 1;
            }
          }
        }
      }

      //////轉換成參數確認有值
      let article_img__i = 0;

      if (imgs != null || imgs != undefined) {
        article_img__i = imgs.length;
      }
      let delete_file__j = 0;

      if (files != null || files != undefined) {
        delete_file__j = files.length;
      }
      ////

      //開始新增多增加的img

      for (i = 0; i < article_img__i; i++) {
        const imgbuffer: CreateImgDto = new CreateImgDto();

        imgbuffer.real_name = String(imgs[i].filename);
        imgbuffer.url = baseurl + imgs[i].filename;
        article_data.imgs.push(imgbuffer);
      }
      ////開始新增多增加的file
      for (i = 0; i < delete_file__j; i++) {
        const filebuffer: CreateFileDto = new CreateFileDto();
        filebuffer.real_name = String(files[i].filename);
        filebuffer.url = baseurl + files[i].filename;
        filebuffer.name = files[i].originalname;
        article_data.files.push(filebuffer);
      }
      //更新Article 更改內容
      article_data.type = updateArticleDto.type;
      article_data.title = updateArticleDto.title;
      article_data.content = updateArticleDto.content;
      article_data.updatetime = new Date().toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false,
      });
      return await article_data.save();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ' Article update  Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createArticleDto: CreateArticleDto,
    imgs: any,
    files: any,
    baseurl: string,
    filepath: string,
  ): Promise<Article> {
    let i = 0;
    const Articledata: CreateArticleDto = createArticleDto;
    Articledata.updatetime = new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
    });
    Articledata.imgs = new Array<CreateImgDto>();
    Articledata.files = new Array<CreateFileDto>();
    //////轉換成參數確認有值
    let article_img__i = 0;

    if (imgs != null || imgs != undefined) {
      article_img__i = imgs.length;
    }
    let delete_file__j = 0;

    if (files != null || files != undefined) {
      delete_file__j = files.length;
    }
    ////
    try {
      //將圖片輸入陣列
      for (i = 0; i < article_img__i; i++) {
        const imgbuffer: CreateImgDto = new CreateImgDto();

        imgbuffer.real_name = String(imgs[i].filename);
        imgbuffer.url = baseurl + imgs[i].filename;
        Articledata.imgs.push(imgbuffer);
      }
      ///

      //將檔案輸入到陣列
      for (i = 0; i < delete_file__j; i++) {
        const filebuffer: CreateFileDto = new CreateFileDto();
        filebuffer.real_name = String(files[i].filename);
        filebuffer.url = baseurl + files[i].filename;
        filebuffer.name = files[i].originalname;
        Articledata.files.push(filebuffer);
      }
      const createdArticle = new this.ArticleModel(Articledata);
      return await createdArticle.save();
    } catch {
      ///刪除以上傳圖片
      for (i = 0; i < article_img__i; i++) {
        fs.unlinkSync(join(file_basepath, imgs[i].filename));
      }
      //刪除以上傳的檔案
      for (i = 0; i < delete_file__j; i++) {
        fs.unlinkSync(join(file_basepath, files[i].filename));
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ' Article Create  Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
