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
exports.VideoslideshowService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const videoslideshow_schema_1 = require("./videoslideshow.schema");
let VideoslideshowService = class VideoslideshowService {
    constructor(VideoslideshowModel) {
        this.VideoslideshowModel = VideoslideshowModel;
    }
    async deleteOne(id) {
        return await this.VideoslideshowModel.deleteOne({
            _id: id,
        }).exec();
    }
    async findtype(type) {
        const footer_data = await this.VideoslideshowModel.find({
            type: type,
        }, '-__v').exec();
        return footer_data;
    }
    async updateone(id, input_data) {
        const Videoslideshow_data = await this.VideoslideshowModel.findOne({
            _id: id,
        }).exec();
        if (Videoslideshow_data == null) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'VideoSlideshow not found the data',
            }, common_1.HttpStatus.BAD_REQUEST);
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
    async create(createVideoSlideshow) {
        createVideoSlideshow.updatetime = new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hour12: false,
        });
        const createdFooter = new this.VideoslideshowModel(createVideoSlideshow);
        return await createdFooter.save();
    }
};
VideoslideshowService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(videoslideshow_schema_1.Videoslideshow.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideoslideshowService);
exports.VideoslideshowService = VideoslideshowService;
//# sourceMappingURL=videoslideshow.service.js.map