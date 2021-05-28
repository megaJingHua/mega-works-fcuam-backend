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
exports.GraphicEditService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const graphic_edit_schema_1 = require("./graphic_edit.schema");
const create_img_graphic_edit_dto_1 = require("./create-img_graphic_edit.dto");
const path_1 = require("path");
const fs = require("fs");
const file_basepath = path_1.join(__dirname, '../uploadfiles');
let GraphicEditService = class GraphicEditService {
    constructor(Graphic_editModel) {
        this.Graphic_editModel = Graphic_editModel;
    }
    async find(type) {
        const Graphic_edit_data = await this.Graphic_editModel.find({
            type: type,
        }).exec();
        return Graphic_edit_data;
    }
    async deleteOne(object_id) {
        const Graphic_edit_data = await this.Graphic_editModel.findOne({
            _id: object_id,
        }).exec();
        const delete_data = this.Graphic_editModel.deleteOne({
            _id: object_id,
        }).exec();
        try {
            if (Graphic_edit_data.img != null || Graphic_edit_data.img != undefined) {
                const isexist = fs.existsSync(path_1.join(file_basepath, Graphic_edit_data.img.real_name));
                if (isexist) {
                    fs.unlinkSync(path_1.join(file_basepath, Graphic_edit_data.img.real_name));
                }
            }
        }
        catch (_a) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: ' Graphic_edit delete  Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await delete_data;
    }
    async updateone(updateGraphic_editDto, img, baseurl, _id) {
        try {
            const Graphic_edit_data = await this.Graphic_editModel.findOne({
                _id: _id,
            }).exec();
            if (updateGraphic_editDto.url == null ||
                updateGraphic_editDto.url == undefined ||
                updateGraphic_editDto.url == '') {
                if (Graphic_edit_data.img != null ||
                    Graphic_edit_data.img != undefined) {
                    const isexist = fs.existsSync(path_1.join(file_basepath, Graphic_edit_data.img.real_name));
                    if (isexist) {
                        fs.unlinkSync(path_1.join(file_basepath, Graphic_edit_data.img.real_name));
                    }
                }
                Graphic_edit_data.img = undefined;
            }
            if (img != null || img != undefined) {
                if (Graphic_edit_data.img != null ||
                    Graphic_edit_data.img != undefined) {
                    const isexist = fs.existsSync(path_1.join(file_basepath, Graphic_edit_data.img.real_name));
                    if (isexist) {
                        fs.unlinkSync(path_1.join(file_basepath, Graphic_edit_data.img.real_name));
                    }
                }
                Graphic_edit_data.img = new create_img_graphic_edit_dto_1.CreateImg_img_graphic_editDto();
                Graphic_edit_data.img.real_name = String(img.filename);
                Graphic_edit_data.img.url = baseurl + img.filename;
            }
            Graphic_edit_data.type = updateGraphic_editDto.type;
            Graphic_edit_data.content = updateGraphic_editDto.content;
            Graphic_edit_data.title = updateGraphic_editDto.title;
            Graphic_edit_data.updatetime = new Date().toLocaleString('zh-TW', {
                timeZone: 'Asia/Taipei',
                hour12: false,
            });
            return await Graphic_edit_data.save();
        }
        catch (_a) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: ' Graphic_edit update  Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createArticleDto, img, baseurl) {
        const Graphic_editdata = createArticleDto;
        Graphic_editdata.updatetime = new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hour12: false,
        });
        Graphic_editdata.img = new create_img_graphic_edit_dto_1.CreateImg_img_graphic_editDto();
        Graphic_editdata.img.real_name = String(img.filename);
        Graphic_editdata.img.url = baseurl + img.filename;
        const createdImgSlideshow = new this.Graphic_editModel(Graphic_editdata);
        return await createdImgSlideshow.save();
    }
};
GraphicEditService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(graphic_edit_schema_1.Graphic_edit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GraphicEditService);
exports.GraphicEditService = GraphicEditService;
//# sourceMappingURL=graphic-edit.service.js.map