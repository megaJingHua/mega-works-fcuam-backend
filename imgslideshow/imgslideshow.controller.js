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
exports.ImgslideshowController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer = require("multer");
const create_imgslideshow_dto_1 = require("./create-imgslideshow.dto");
const imgslideshow_service_1 = require("./imgslideshow.service");
const update_imgslideshow_dto_1 = require("./update-imgslideshow.dto");
const process_1 = require("process");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../user_role/roles.decorator");
const role_enum_1 = require("../user_role/role.enum");
const roles_guard_1 = require("../user_role/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_imgslideshowApi_dto_1 = require("./update-imgslideshowApi.dto");
let ImgslideshowController = class ImgslideshowController {
    constructor(imgSlideshowService) {
        this.imgSlideshowService = imgSlideshowService;
    }
    async getall(params, res) {
        const data = await this.imgSlideshowService.find(parseInt(params.type));
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async deleteone(params, res) {
        const result = await this.imgSlideshowService.deleteOne(params.objectid);
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
    async uploadFile_updateImgSlideshow(img, input_data, res, params) {
        const ImgSildeshow_data = input_data;
        const baseurl = process_1.env.app_url_public;
        const data = await this.imgSlideshowService.updateone(ImgSildeshow_data, img, baseurl, params.objectid);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
    async uploadFile_createImgSlideshow(img, input_data, res) {
        const ImgSildeshow_data = input_data;
        const baseurl = process_1.env.app_url_public;
        const data = await this.imgSlideshowService.create(ImgSildeshow_data, img, baseurl);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: '取得Type圖片輪播資料',
        description: '取得Type圖片輪播資料',
    }),
    swagger_1.ApiParam({ name: 'type', description: '' }),
    swagger_1.ApiOkResponse({
        description: '取得Type圖片輪播資料',
        type: create_imgslideshow_dto_1.CreateImgSlideshowDto,
    }),
    common_1.Get(':type'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImgslideshowController.prototype, "getall", null);
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
], ImgslideshowController.prototype, "deleteone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '修改一筆圖片輪播',
        description: '修改一筆圖片輪播',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiParam({ name: 'objectid', description: '60407a84144e9da9a8d89d14' }),
    swagger_1.ApiBody({
        description: '修改一筆圖片輪播',
        type: update_imgslideshowApi_dto_1.UpdateImgSlideshowApiDto,
    }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':objectid'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('img', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path_1.join(__dirname, '../uploadfiles'));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __param(3, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_imgslideshow_dto_1.UpdateImgSlideshowDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ImgslideshowController.prototype, "uploadFile_updateImgSlideshow", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '新增一筆圖片輪播資料',
        description: '新增一筆圖片輪播資料',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        description: '新增一筆圖片輪播資料',
        type: create_imgslideshow_dto_1.CreateImgSlideshowDto,
    }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('img', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path_1.join(__dirname, '../uploadfiles'));
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_imgslideshow_dto_1.CreateImgSlideshowDto, Object]),
    __metadata("design:returntype", Promise)
], ImgslideshowController.prototype, "uploadFile_createImgSlideshow", null);
ImgslideshowController = __decorate([
    swagger_1.ApiTags('圖片輪播'),
    common_1.Controller('imgslideshow'),
    __metadata("design:paramtypes", [imgslideshow_service_1.ImgslideshowService])
], ImgslideshowController);
exports.ImgslideshowController = ImgslideshowController;
//# sourceMappingURL=imgslideshow.controller.js.map