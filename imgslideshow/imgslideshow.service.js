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
exports.ImgslideshowService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const path_1 = require("path");
const create_img_slideshow_dto_1 = require("./create-img_slideshow.dto");
const imgslideshow_schema_1 = require("./imgslideshow.schema");
const fs = require("fs");
const file_basepath = path_1.join(__dirname, '../uploadfiles');
let ImgslideshowService = class ImgslideshowService {
    constructor(ImgSlideshowModel) {
        this.ImgSlideshowModel = ImgSlideshowModel;
    }
    async find(type) {
        const ImgSlideshow_data = await this.ImgSlideshowModel.find({
            type: type,
        }).exec();
        return ImgSlideshow_data;
    }
    async deleteOne(object_id) {
        const ImgSlideshow_data = await this.ImgSlideshowModel.findOne({
            _id: object_id,
        }).exec();
        const delete_data = this.ImgSlideshowModel.deleteOne({
            _id: object_id,
        }).exec();
        try {
            if (ImgSlideshow_data.img != null || ImgSlideshow_data.img != undefined) {
                const isexist = fs.existsSync(path_1.join(file_basepath, ImgSlideshow_data.img.real_name));
                if (isexist) {
                    fs.unlinkSync(path_1.join(file_basepath, ImgSlideshow_data.img.real_name));
                }
            }
        }
        catch (_a) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: ' ImgSlideshow delete  Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await delete_data;
    }
    async updateone(updateImgSlideshowDto, img, baseurl, _id) {
        try {
            const ImgSlideshow_data = await this.ImgSlideshowModel.findOne({
                _id: _id,
            }).exec();
            if (updateImgSlideshowDto.url == null ||
                updateImgSlideshowDto.url == undefined ||
                updateImgSlideshowDto.url == '') {
                if (ImgSlideshow_data.img != null ||
                    ImgSlideshow_data.img != undefined) {
                    const isexist = fs.existsSync(path_1.join(file_basepath, ImgSlideshow_data.img.real_name));
                    if (isexist) {
                        fs.unlinkSync(path_1.join(file_basepath, ImgSlideshow_data.img.real_name));
                    }
                }
                ImgSlideshow_data.img = undefined;
            }
            if (img != null || img != undefined) {
                if (ImgSlideshow_data.img != null ||
                    ImgSlideshow_data.img != undefined) {
                    const isexist = fs.existsSync(path_1.join(file_basepath, ImgSlideshow_data.img.real_name));
                    if (isexist) {
                        fs.unlinkSync(path_1.join(file_basepath, ImgSlideshow_data.img.real_name));
                    }
                }
                ImgSlideshow_data.img = new create_img_slideshow_dto_1.CreateImg_slideshowDto();
                ImgSlideshow_data.img.real_name = String(img.filename);
                ImgSlideshow_data.img.url = baseurl + img.filename;
            }
            ImgSlideshow_data.type = updateImgSlideshowDto.type;
            ImgSlideshow_data.type_name = updateImgSlideshowDto.type_name;
            ImgSlideshow_data.title = updateImgSlideshowDto.title;
            ImgSlideshow_data.updatetime = new Date().toLocaleString('zh-TW', {
                timeZone: 'Asia/Taipei',
                hour12: false,
            });
            return await ImgSlideshow_data.save();
        }
        catch (_a) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: ' ImgSlideshow update  Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createArticleDto, img, baseurl) {
        const ImgSlideshowdata = createArticleDto;
        ImgSlideshowdata.updatetime = new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hour12: false,
        });
        ImgSlideshowdata.img = new create_img_slideshow_dto_1.CreateImg_slideshowDto();
        ImgSlideshowdata.img.real_name = String(img.filename);
        ImgSlideshowdata.img.url = baseurl + img.filename;
        const createdImgSlideshow = new this.ImgSlideshowModel(ImgSlideshowdata);
        return await createdImgSlideshow.save();
    }
};
ImgslideshowService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(imgslideshow_schema_1.ImgSlideshow.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ImgslideshowService);
exports.ImgslideshowService = ImgslideshowService;
//# sourceMappingURL=imgslideshow.service.js.map