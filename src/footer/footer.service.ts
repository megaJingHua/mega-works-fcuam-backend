import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Footer, FooterDocument } from './footer.schema';
import { footer_text } from './footer_data_formate';
import { Model } from 'mongoose';
import { CreateFooterDto } from './create-footer.dto';
@Injectable()
export class FooterService {
  constructor(
    @InjectModel(Footer.name) private FooterModel: Model<FooterDocument>,
  ) {}

  async create(createFootDto: CreateFooterDto): Promise<Footer> {
    const createdFooter = new this.FooterModel(createFootDto);
    return await createdFooter.save();
  }

  async findAll(): Promise<any> {
    const all_footer = await this.FooterModel.find().exec();

    const result = {};
    let i = 0;
    for (i = 0; i < all_footer.length; i++) {
      result[all_footer[i].role] = all_footer[i].context;

      ///obj["sex"] = "boy";
    }

    return result;
  }
  async findone(role_type: string): Promise<any> {
    const footer_data = await this.FooterModel.findOne({
      role: role_type,
    }).exec();

    const result = {};
    result[footer_data.role] = footer_data.context;
    return result;
  }

  async updateone(
    role_type: string,
    context_str: CreateFooterDto,
  ): Promise<any> {
    const footer_data = await this.FooterModel.findOne({
      role: role_type,
    }).exec();

    if (footer_data == null) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'not found the data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    footer_data.role = context_str.role;
    footer_data.context = context_str.context;
    return await footer_data.save();
  }

  async deleteOne(role_type: string): Promise<any> {
    return await this.FooterModel.deleteOne({
      role: role_type,
    }).exec();
  }
  async createorupdate(createFootDto: CreateFooterDto): Promise<Footer> {
    let bool: boolean;
    let footer_data;
    try {
      footer_data = await this.FooterModel.findOne({
        role: createFootDto.role,
      }).exec();

      const result = {};
      result[footer_data.role] = footer_data.context;
      bool = true;
    } catch {
      bool = false;
    }
    ///確認是update還是create
    try {
      if (bool) {
        footer_data.role = createFootDto.role;
        footer_data.context = createFootDto.context;
        return await footer_data.save();
      } else {
        const footer_maxid = await this.FooterModel.find()
          .sort({ id: -1 })
          .limit(1)
          .exec();
        try {
          createFootDto.id = footer_maxid[0].id + 1;
        } catch {
          createFootDto.id = 1;
        }
        const createdFooter = new this.FooterModel(createFootDto);
        return await createdFooter.save();
      }
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Create and update Error !',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  getdata(): footer_text[] {
    const data: footer_text[] = [
      {
        id: 1,
        role: 'footer',
        context: '逢甲大學 應用數學系',
      },
      {
        id: 2,
        role: 'footer',
        context: '連絡電話：04-24517250 轉 5101',
      },

      {
        id: 3,
        role: 'footer',
        context: '連絡信箱：apmath  fcu.edu.tw',
      },
      {
        id: 4,
        role: 'footer',
        context: '服務時間：周一至周五 08:30 - 17:30',
      },
      {
        id: 5,
        role: 'footer',
        context: 'Copyright@逢甲大學Feng Chia University',
      },
      {
        id: 6,
        role: 'footer',
        context: '更新日期：2020-02-04',
      },
    ];

    return data;
  }
}
