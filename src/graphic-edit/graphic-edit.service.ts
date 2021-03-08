import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creategraphic_editDto } from './create-graphic_edit.dto';
import { Graphic_edit, Graphic_editDocument } from './graphic_edit.schema';
import { CreateImg_img_graphic_editDto } from './create-img_graphic_edit.dto';
import { join } from 'path';
import { UpdateGraphic_editDto } from './update-graphic_edit.dto';
import * as fs from 'fs';
const file_basepath = join(__dirname, '../uploadfiles');

@Injectable()
export class GraphicEditService {
  constructor(
    @InjectModel(Graphic_edit.name)
    private Graphic_editModel: Model<Graphic_editDocument>,
  ) {}

  async find(type: number): Promise<any> {
    const Graphic_edit_data = await this.Graphic_editModel.find({
      type: type,
    }).exec();

    return Graphic_edit_data;
  }

  async deleteOne(object_id: string): Promise<any> {
    const Graphic_edit_data = await this.Graphic_editModel.findOne({
      _id: object_id,
    }).exec();

    const delete_data = this.Graphic_editModel.deleteOne({
      _id: object_id,
    }).exec();
    try {
      if (Graphic_edit_data.img != null || Graphic_edit_data.img != undefined) {
        ///刪除以上傳圖片
        const isexist = fs.existsSync(
          join(file_basepath, Graphic_edit_data.img.real_name),
        );
        if (isexist) {
          fs.unlinkSync(join(file_basepath, Graphic_edit_data.img.real_name));
        }
      }
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ' Graphic_edit delete  Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await delete_data;
  }

  async updateone(
    updateGraphic_editDto: UpdateGraphic_editDto,
    img: any,
    baseurl: string,
    _id: string,
  ): Promise<any> {
    try {
      const Graphic_edit_data = await this.Graphic_editModel.findOne({
        _id: _id,
      }).exec();
      //沒有url代表去掉原來的圖片
      if (
        updateGraphic_editDto.url == null ||
        updateGraphic_editDto.url == undefined ||
        updateGraphic_editDto.url == ''
      ) {
        if (
          Graphic_edit_data.img != null ||
          Graphic_edit_data.img != undefined
        ) {
          ///刪除以上傳圖片
          const isexist = fs.existsSync(
            join(file_basepath, Graphic_edit_data.img.real_name),
          );
          if (isexist) {
            fs.unlinkSync(join(file_basepath, Graphic_edit_data.img.real_name));
          }
        }
        Graphic_edit_data.img = undefined;
      }
      ///img有值的話要替換
      if (img != null || img != undefined) {
        ///先將原來的圖片刪掉
        if (
          Graphic_edit_data.img != null ||
          Graphic_edit_data.img != undefined
        ) {
          ///刪除以上傳圖片
          const isexist = fs.existsSync(
            join(file_basepath, Graphic_edit_data.img.real_name),
          );
          if (isexist) {
            fs.unlinkSync(join(file_basepath, Graphic_edit_data.img.real_name));
          }
        }
        //在進行值替換
        Graphic_edit_data.img = new CreateImg_img_graphic_editDto();
        Graphic_edit_data.img.real_name = String(img.filename);
        Graphic_edit_data.img.url = baseurl + img.filename;
      }
      ///都處理圖片完畢後處理其他參數
      Graphic_edit_data.type = updateGraphic_editDto.type;
      Graphic_edit_data.content = updateGraphic_editDto.content;
      Graphic_edit_data.title = updateGraphic_editDto.title;
      Graphic_edit_data.updatetime = new Date().toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        hour12: false,
      });
      return await Graphic_edit_data.save();
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ' Graphic_edit update  Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createArticleDto: Creategraphic_editDto,
    img: any,
    baseurl: string,
  ): Promise<Graphic_edit> {
    const Graphic_editdata: Creategraphic_editDto = createArticleDto;
    Graphic_editdata.updatetime = new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
    });
    Graphic_editdata.img = new CreateImg_img_graphic_editDto();
    Graphic_editdata.img.real_name = String(img.filename);
    Graphic_editdata.img.url = baseurl + img.filename;

    const createdImgSlideshow = new this.Graphic_editModel(Graphic_editdata);
    return await createdImgSlideshow.save();
  }
}
