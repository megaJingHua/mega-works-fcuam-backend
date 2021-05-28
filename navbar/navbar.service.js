"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let NavbarService = class NavbarService {
    constructor(NavbarModel, NavbarchildernModel) {
        this.NavbarModel = NavbarModel;
        this.NavbarchildernModel = NavbarchildernModel;
    }
    async create(createNavbarDto) {
        let i = 0;
        const createdNavbar = new this.NavbarModel({
            id: createNavbarDto.id,
            name: createNavbarDto.name,
            url: createNavbarDto.url,
        });
        const CrateNavbar = await createdNavbar.save();
        for (i = 0; i < createNavbarDto.childern.length; i++) {
            const createdNavbarchildern = new this.NavbarchildernModel({
                name: createNavbarDto.childern[i].name,
                url: createNavbarDto.childern[i].url,
                navbar: CrateNavbar._id,
            });
            const CrateNavbarchildern = await createdNavbarchildern.save();
            CrateNavbar.childern.push(CrateNavbarchildern);
        }
        return await CrateNavbar.save();
    }
    async findAll() {
        const all_Navbar = await this.NavbarModel.find({}, '-_id -__v -id')
            .populate('childern', 'name url -_id ')
            .exec();
        return all_Navbar;
    }
    async deletenavbar() {
        return await this.NavbarModel.deleteMany({}).exec();
    }
    async deletenavbarchildern() {
        return await this.NavbarchildernModel.deleteMany({}).exec();
    }
};
NavbarService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Navbar')),
    __param(1, mongoose_1.InjectModel('Navbarchildern')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], NavbarService);
exports.NavbarService = NavbarService;
//# sourceMappingURL=navbar.service.js.map