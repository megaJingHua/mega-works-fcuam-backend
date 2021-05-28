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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const article_schema_1 = require("./article.schema");
const mongoose_2 = require("mongoose");
const create_img_dto_1 = require("./create-img.dto");
const create_file_dto_1 = require("./create-file.dto");
const fs = require("fs");
const path_1 = require("path");
const file_basepath = path_1.join(__dirname, '../uploadfiles');
let ArticleService = class ArticleService {
    constructor(ArticleModel) {
        this.ArticleModel = ArticleModel;
    }
    async findall() {
        const article_data = await this.ArticleModel.find({}).exec();
        return article_data;
    }
    async findone(object_id) {
        const article_data = await this.ArticleModel.findOne({
            _id: object_id,
        }).exec();
        return article_data;
    }
    async deleteOne(object_id) {
        let i = 0;
        const article_data = await this.ArticleModel.findOne({
            _id: object_id,
        }).exec();
        const delete_data = this.ArticleModel.deleteOne({
            _id: object_id,
        }).exec();
        try {
            let article_img__i = 0;
            if (article_data.imgs != null || article_data.imgs != undefined) {
                article_img__i = article_data.imgs.length;
            }
            let delete_file__j = 0;
            if (article_data.files != null || article_data.files != undefined) {
                delete_file__j = article_data.files.length;
            }
            for (i = 0; i < article_img__i; i++) {
                fs.unlinkSync(path_1.join(file_basepath, article_data.imgs[i].real_name));
            }
            for (i = 0; i < delete_file__j; i++) {
                fs.unlinkSync(path_1.join(file_basepath, article_data.files[i].real_name));
            }
        }
        catch (_a) { }
        return await delete_data;
    }
    async updateone(updateArticleDto, imgs, files, baseurl, filepath) {
        let i = 0;
        let j = 0;
        try {
            const article_data = await this.ArticleModel.findOne({
                _id: updateArticleDto.id,
            }).exec();
            let article_img_data_i = 0;
            let delete_img_url_j = 0;
            if (article_data.imgs.length != null ||
                article_data.imgs.length != undefined) {
                article_img_data_i = article_data.imgs.length;
            }
            if (updateArticleDto.delete_img_url != null ||
                updateArticleDto.delete_img_url != undefined) {
                delete_img_url_j = updateArticleDto.delete_img_url.length;
            }
            for (i = 0; i < article_img_data_i; i++) {
                for (j = 0; j < delete_img_url_j; j++) {
                    if (article_data.imgs[i].url == updateArticleDto.delete_img_url[j]) {
                        fs.unlinkSync(path_1.join(file_basepath, article_data.imgs[i].real_name));
                        article_data.imgs.splice(i);
                        if (i != 0) {
                            i = i - 1;
                            article_img_data_i = article_img_data_i - 1;
                        }
                    }
                }
            }
            let article_flie_data_i = 0;
            let delete_flie_url_j = 0;
            if (article_data.files.length != null ||
                article_data.files.length != undefined) {
                article_flie_data_i = article_data.files.length;
            }
            if (updateArticleDto.delete_file_url != null ||
                updateArticleDto.delete_file_url != undefined) {
                delete_flie_url_j = updateArticleDto.delete_file_url.length;
            }
            for (i = 0; i < article_flie_data_i; i++) {
                for (j = 0; j < delete_flie_url_j; j++) {
                    if (article_data.files[i].url == updateArticleDto.delete_file_url[j]) {
                        fs.unlinkSync(path_1.join(file_basepath, article_data.files[i].real_name));
                        article_data.files.splice(i);
                        if (i != 0) {
                            i = i - 1;
                            article_flie_data_i = article_flie_data_i - 1;
                        }
                    }
                }
            }
            let article_img__i = 0;
            if (imgs != null || imgs != undefined) {
                article_img__i = imgs.length;
            }
            let delete_file__j = 0;
            if (files != null || files != undefined) {
                delete_file__j = files.length;
            }
            for (i = 0; i < article_img__i; i++) {
                const imgbuffer = new create_img_dto_1.CreateImgDto();
                imgbuffer.real_name = String(imgs[i].filename);
                imgbuffer.url = baseurl + imgs[i].filename;
                article_data.imgs.push(imgbuffer);
            }
            for (i = 0; i < delete_file__j; i++) {
                const filebuffer = new create_file_dto_1.CreateFileDto();
                filebuffer.real_name = String(files[i].filename);
                filebuffer.url = baseurl + files[i].filename;
                filebuffer.name = files[i].originalname;
                article_data.files.push(filebuffer);
            }
            article_data.type = updateArticleDto.type;
            article_data.title = updateArticleDto.title;
            article_data.content = updateArticleDto.content;
            article_data.updatetime = new Date().toLocaleString('zh-TW', {
                timeZone: 'Asia/Taipei',
                hour12: false,
            });
            return await article_data.save();
        }
        catch (_a) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: ' Article update  Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createArticleDto, imgs, files, baseurl, filepath) {
        let i = 0;
        const Articledata = createArticleDto;
        Articledata.updatetime = new Date().toLocaleString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hour12: false,
        });
        Articledata.imgs = new Array();
        Articledata.files = new Array();
        let article_img__i = 0;
        if (imgs != null || imgs != undefined) {
            article_img__i = imgs.length;
        }
        let delete_file__j = 0;
        if (files != null || files != undefined) {
            delete_file__j = files.length;
        }
        try {
            for (i = 0; i < article_img__i; i++) {
                const imgbuffer = new create_img_dto_1.CreateImgDto();
                imgbuffer.real_name = String(imgs[i].filename);
                imgbuffer.url = baseurl + imgs[i].filename;
                Articledata.imgs.push(imgbuffer);
            }
            for (i = 0; i < delete_file__j; i++) {
                const filebuffer = new create_file_dto_1.CreateFileDto();
                filebuffer.real_name = String(files[i].filename);
                filebuffer.url = baseurl + files[i].filename;
                filebuffer.name = files[i].originalname;
                Articledata.files.push(filebuffer);
            }
            const createdArticle = new this.ArticleModel(Articledata);
            return await createdArticle.save();
        }
        catch (_a) {
            for (i = 0; i < article_img__i; i++) {
                fs.unlinkSync(path_1.join(file_basepath, imgs[i].filename));
            }
            for (i = 0; i < delete_file__j; i++) {
                fs.unlinkSync(path_1.join(file_basepath, files[i].filename));
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: ' Article Create  Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(article_schema_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map