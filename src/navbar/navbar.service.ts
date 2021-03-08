import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Navbar, NavbarDocument } from './navbar.schema';
import { NavbarchildernDocument } from './navbarchildern.schema';
import { CreateNavbarDto } from './create-navbar.dto';
@Injectable()
export class NavbarService {
  constructor(
    @InjectModel('Navbar') private NavbarModel: Model<NavbarDocument>,
    @InjectModel('Navbarchildern')
    private NavbarchildernModel: Model<NavbarchildernDocument>,
  ) {}

  async create(createNavbarDto: CreateNavbarDto): Promise<Navbar> {
    let i = 0;
    ///Navbar model
    const createdNavbar = new this.NavbarModel({
      id: createNavbarDto.id,
      name: createNavbarDto.name,
      url: createNavbarDto.url,
    });

    const CrateNavbar = await createdNavbar.save();
    for (i = 0; i < createNavbarDto.childern.length; i++) {
      ////Navbarchildern mdoel
      const createdNavbarchildern = new this.NavbarchildernModel({
        name: createNavbarDto.childern[i].name,
        url: createNavbarDto.childern[i].url,
        navbar: CrateNavbar._id,
      });
      const CrateNavbarchildern = await createdNavbarchildern.save();
      ///Navbarchildern 存進navbar的childern裡面
      CrateNavbar.childern.push(CrateNavbarchildern);
    }
    return await CrateNavbar.save();
  }

  async findAll(): Promise<any> {
    const all_Navbar = await this.NavbarModel.find({}, '-_id -__v -id')
      .populate('childern', 'name url -_id ')
      .exec();

    return all_Navbar;
  }
  async deletenavbar(): Promise<any> {
    return await this.NavbarModel.deleteMany({}).exec();
  }
  async deletenavbarchildern(): Promise<any> {
    return await this.NavbarchildernModel.deleteMany({}).exec();
  }
}
