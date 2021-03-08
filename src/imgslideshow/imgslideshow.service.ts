import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import { CreateImgSlideshowDto } from './create-imgslideshow.dto';
import { CreateImg_slideshowDto } from './create-img_slideshow.dto';
import { ImgSlideshow, ImgSlideshowDocument } from './imgslideshow.schema';
import * as fs from 'fs';
import { UpdateImgSlideshowDto } from './update-imgslideshow.dto';
const file_basepath = join(__dirname, '../uploadfiles');
@Injectable()
export class ImgslideshowService {
  constructor(
    @InjectModel(ImgSlideshow.name)
    private ImgSlideshowModel: Model<ImgSlideshowDocument>,
  ) {}

  async find(type: number): Promise<any> {
    const ImgSlideshow_data = await this.ImgSlideshowModel.find({
      type: type,
    }).exec();

    return ImgSlideshow_data;
  }

  async deleteOne(object_id: string): Promise<any> {
    const ImgSlideshow_data = await this.ImgSlideshowModel.findOne({
      _id: object_id,
    }).exec();

    const delete_data = this.ImgSlideshowModel.deleteOne({
      _id: object_id,
    }).exec();
    try {
      if (ImgSlideshow_data.img != null || ImgSlideshow_data.img != undefined) {
        ///刪除以上傳圖片
        const isexist = fs.existsSync(
          join(file_basepath, ImgSlideshow_data.img.real_name),
        );
        if (isexist) {
          fs.unlinkSync(join(file_basepath, ImgSlideshow_data.img.real_name));
        }
      }
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ' ImgSlideshow delete  Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await delete_data;
  }

  async updateone(
    updateImgSlideshowDto: UpdateImgSlideshowDto,
    img: any,
    baseurl: string,
    _id: string,
  ): Promise<any> {
    try {
      const ImgSlideshow_data = await this.ImgSlideshowModel.findOne({
        _id: _id,
      }).exec();
      //沒有url代表去掉原來的圖片
      if (
        updateImgSlideshowDto.url == null ||
        updateImgSlideshowDto.url == undefined ||
        updateImgSlideshowDto.url == ''
      ) {
        if (
          ImgSlideshow_data.img != null ||
          ImgSlideshow_data.img != undefined
        ) {
          ///刪除以上傳圖片
          const isexist = fs.existsSync(
            join(file_basepath, ImgSlideshow_data.img.real_name),
          );
          if (isexist) {
            fs.unlinkSync(join(file_basepath, ImgSlideshow_data.img.real_name));
          }
        }
        ImgSlideshow_data.img = undefined;
      }
      ///img有值的話要替換
      if (img != null || img != undefined) {
        ///先將原來的圖片刪掉
        if (
          ImgSlideshow_data.img != null ||
          ImgSlideshow_data.img != undefined
        ) {
          ///刪除以上傳圖片
          const isexist = fs.existsSync(
            join(file_basepath, ImgSlideshow_data.img.real_name),
          );
          if (isexist) {
            fs.unlinkSync(join(file_basepath, ImgSlideshow_data.img.real_name));
          }
        }
        //在進行值替換
        ImgSlideshow_data.img = new CreateImg_slideshowDto();
        ImgSlideshow_data.img.real_name = String(img.filename);
        ImgSlideshow_data.img.url = baseurl + img.filename;
      }
      ///都處理圖片完畢後處理其他參數
      ImgSlideshow_data.type = updateImgSlideshowDto.type;
      ImgSlideshow_data.type_name = updateImgSlideshowDto.type_name;
      ImgSlideshow_data.title = updateImgSlideshowDto.title;
      ImgSlideshow_data.updatetime = new Date().toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false,
      });
      return await ImgSlideshow_data.save();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ' ImgSlideshow update  Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createArticleDto: CreateImgSlideshowDto,
    img: any,
    baseurl: string,
  ): Promise<ImgSlideshow> {
    const ImgSlideshowdata: CreateImgSlideshowDto = createArticleDto;
    ImgSlideshowdata.updatetime = new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
    });
    ImgSlideshowdata.img = new CreateImg_slideshowDto();
    ImgSlideshowdata.img.real_name = String(img.filename);
    ImgSlideshowdata.img.url = baseurl + img.filename;

    const createdImgSlideshow = new this.ImgSlideshowModel(ImgSlideshowdata);
    return await createdImgSlideshow.save();
  }
}
