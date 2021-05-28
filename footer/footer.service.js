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
exports.FooterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const footer_schema_1 = require("./footer.schema");
const mongoose_2 = require("mongoose");
let FooterService = class FooterService {
    constructor(FooterModel) {
        this.FooterModel = FooterModel;
    }
    async create(createFootDto) {
        const createdFooter = new this.FooterModel(createFootDto);
        return await createdFooter.save();
    }
    async findAll() {
        const all_footer = await this.FooterModel.find().exec();
        const result = {};
        let i = 0;
        for (i = 0; i < all_footer.length; i++) {
            result[all_footer[i].role] = all_footer[i].context;
        }
        return result;
    }
    async findone(role_type) {
        const footer_data = await this.FooterModel.findOne({
            role: role_type,
        }).exec();
        const result = {};
        result[footer_data.role] = footer_data.context;
        return result;
    }
    async updateone(role_type, context_str) {
        const footer_data = await this.FooterModel.findOne({
            role: role_type,
        }).exec();
        if (footer_data == null) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'not found the data',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        footer_data.role = context_str.role;
        footer_data.context = context_str.context;
        return await footer_data.save();
    }
    async deleteOne(role_type) {
        return await this.FooterModel.deleteOne({
            role: role_type,
        }).exec();
    }
    async createorupdate(createFootDto) {
        let bool;
        let footer_data;
        try {
            footer_data = await this.FooterModel.findOne({
                role: createFootDto.role,
            }).exec();
            const result = {};
            result[footer_data.role] = footer_data.context;
            bool = true;
        }
        catch (_a) {
            bool = false;
        }
        try {
            if (bool) {
                footer_data.role = createFootDto.role;
                footer_data.context = createFootDto.context;
                return await footer_data.save();
            }
            else {
                const footer_maxid = await this.FooterModel.find()
                    .sort({ id: -1 })
                    .limit(1)
                    .exec();
                try {
                    createFootDto.id = footer_maxid[0].id + 1;
                }
                catch (_b) {
                    createFootDto.id = 1;
                }
                const createdFooter = new this.FooterModel(createFootDto);
                return await createdFooter.save();
            }
        }
        catch (_c) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Create and update Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getdata() {
        const data = [
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
};
FooterService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(footer_schema_1.Footer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FooterService);
exports.FooterService = FooterService;
//# sourceMappingURL=footer.service.js.map