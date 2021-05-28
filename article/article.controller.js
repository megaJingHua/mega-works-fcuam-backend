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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer = require("multer");
const create_article_dto_1 = require("./create-article.dto");
const article_service_1 = require("./article.service");
const update_article_dto_1 = require("./update-article.dto");
const roles_decorator_1 = require("../user_role/roles.decorator");
const role_enum_1 = require("../user_role/role.enum");
const roles_guard_1 = require("../user_role/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const process_1 = require("process");
const swagger_1 = require("@nestjs/swagger");
const file_type = 'imgs';
const file_type2 = 'files';
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async getoneArticle(params, res) {
        const data = await this.articleService.findone(params.objectid);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async getallArticle(params, res) {
        const data = await this.articleService.findall();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async deleteone(params, res) {
        const result = await this.articleService.deleteOne(params.objectid);
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
    async updateone(files, res, params, input_data) {
        const article_data_update = new update_article_dto_1.UpdateArticleDto();
        article_data_update.type = parseInt(input_data.type);
        article_data_update.title = input_data.title;
        article_data_update.content = input_data.content;
        if (typeof input_data.delete_img_url != 'string') {
            article_data_update.delete_img_url = input_data.delete_img_url;
        }
        else {
            article_data_update.delete_img_url = new Array();
            article_data_update.delete_img_url.push(input_data.delete_img_url);
        }
        if (typeof input_data.delete_file_url != 'string') {
            article_data_update.delete_file_url = input_data.delete_file_url;
        }
        else {
            article_data_update.delete_file_url = new Array();
            article_data_update.delete_file_url.push(input_data.delete_file_url);
        }
        article_data_update.id = params.objectid;
        const imgs = files.imgs;
        const files_data = files.files;
        const baseurl = process_1.env.app_url_public;
        const filepath = path_1.join(__dirname, '../uploadfiles');
        const data = await this.articleService.updateone(article_data_update, imgs, files_data, baseurl, filepath);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
    async uploadFile_createArticle(files, input_data, res) {
        const article_data = input_data;
        article_data.type = Number(article_data.type);
        const imgs = files.imgs;
        const files_data = files.files;
        const baseurl = process_1.env.app_url_public;
        const filepath = path_1.join(__dirname, '../uploadfiles');
        const data = await this.articleService.create(article_data, imgs, files_data, baseurl, filepath);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: '取得文章資料',
        description: '取得文章資料',
    }),
    swagger_1.ApiParam({ name: 'objectid', description: '' }),
    swagger_1.ApiOkResponse({
        description: '取得文章資料',
        type: create_article_dto_1.CreateArticleDto,
    }),
    common_1.Get(':objectid'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getoneArticle", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '取得全部文章資料',
        description: '取得全部文章資料',
    }),
    swagger_1.ApiParam({ name: '不用參數', required: false }),
    swagger_1.ApiOkResponse({
        description: '取得全部文章資料',
        type: [create_article_dto_1.CreateArticleDto],
    }),
    common_1.Get(),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getallArticle", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '刪除單一資料',
        description: '刪除單一資料',
    }),
    swagger_1.ApiParam({ name: 'objectid', description: '' }),
    swagger_1.ApiOkResponse({
        description: '刪除單一資料',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':objectid'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '修改一筆文章資料(含複數圖片及複數檔案)',
        description: '修改一筆文章資料(含複數圖片及複數檔案)',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiParam({ name: 'objectid', description: '60407a84144e9da9a8d89d14' }),
    swagger_1.ApiBody({
        description: '修改一筆文章資料(含複數圖片及複數檔案)',
        type: update_article_dto_1.UpdateArticleDto,
    }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':objectid'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([{ name: file_type }, { name: file_type2 }], {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path_1.join(__dirname, '../uploadfiles'));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    })),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param()),
    __param(3, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '新增一筆文章資料(含複數圖片及複數檔案)',
        description: '新增一筆文章資料(含複數圖片及複數檔案)',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        description: '新增一筆文章資料(含複數圖片及複數檔案)',
        type: create_article_dto_1.CreateArticleDto,
    }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([{ name: file_type }, { name: file_type2 }], {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path_1.join(__dirname, '../uploadfiles'));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    })),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_article_dto_1.CreateArticleDto, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "uploadFile_createArticle", null);
ArticleController = __decorate([
    swagger_1.ApiTags('文章編輯'),
    common_1.Controller('article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map