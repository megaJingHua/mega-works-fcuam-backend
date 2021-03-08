import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideoSlideshowDto } from './create-videoslideshow.dto';
import {
  Videoslideshow,
  VideoslideshowDocument,
} from './videoslideshow.schema';

@Injectable()
export class VideoslideshowService {
  constructor(
    @InjectModel(Videoslideshow.name)
    private VideoslideshowModel: Model<VideoslideshowDocument>,
  ) {}

  async deleteOne(id: string): Promise<any> {
    return await this.VideoslideshowModel.deleteOne({
      _id: id,
    }).exec();
  }

  async findtype(type: number): Promise<any> {
    const footer_data = await this.VideoslideshowModel.find(
      {
        type: type,
      },
      '-__v',
    ).exec();

    return footer_data;
  }

  async updateone(
    id: string,
    input_data: CreateVideoSlideshowDto,
  ): Promise<any> {
    const Videoslideshow_data = await this.VideoslideshowModel.findOne({
      _id: id,
    }).exec();

    if (Videoslideshow_data == null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'VideoSlideshow not found the data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    Videoslideshow_data.type = input_data.type;
    Videoslideshow_data.type_name = input_data.type_name;
    Videoslideshow_data.title = input_data.title;
    Videoslideshow_data.url = input_data.url;
    Videoslideshow_data.updatetime = new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
    });
    return await Videoslideshow_data.save();
  }

  async create(
    createVideoSlideshow: CreateVideoSlideshowDto,
  ): Promise<Videoslideshow> {
    createVideoSlideshow.updatetime = new Date().toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      hour12: false,
    });
    const createdFooter = new this.VideoslideshowModel(createVideoSlideshow);
    return await createdFooter.save();
  }
}
