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
exports.GraphicEditController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const graphic_edit_service_1 = require("./graphic-edit.service");
const multer = require("multer");
const path_1 = require("path");
const create_graphic_edit_dto_1 = require("./create-graphic_edit.dto");
const update_graphic_edit_dto_1 = require("./update-graphic_edit.dto");
const process_1 = require("process");
const swagger_1 = require("@nestjs/swagger");
const graphic_edit_schema_1 = require("./graphic_edit.schema");
const roles_decorator_1 = require("../user_role/roles.decorator");
const roles_guard_1 = require("../user_role/roles.guard");
const role_enum_1 = require("../user_role/role.enum");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_graphic_editApi_dto_1 = require("./update-graphic_editApi.dto");
let GraphicEditController = class GraphicEditController {
    constructor(graphicEditService) {
        this.graphicEditService = graphicEditService;
    }
    async getall(params, res) {
        const data = await this.graphicEditService.find(parseInt(params.type));
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async deleteone(params, res) {
        const result = await this.graphicEditService.deleteOne(params.objectid);
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
    async uploadFile_updateGraphic_edit(img, input_data, res, params) {
        const Graphic_edit_data = input_data;
        const baseurl = process_1.env.app_url_public;
        const data = await this.graphicEditService.updateone(Graphic_edit_data, img, baseurl, params.objectid);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
    async uploadFile_createGraphic_edit(img, input_data, res) {
        const ImgSildeshow_data = input_data;
        const baseurl = process_1.env.app_url_public;
        const data = await this.graphicEditService.create(ImgSildeshow_data, img, baseurl);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: '取得Type圖文資料',
        description: '取得Type圖文資料',
    }),
    swagger_1.ApiParam({ name: 'type', description: '' }),
    swagger_1.ApiOkResponse({
        description: '取得Type圖文資料',
        type: create_graphic_edit_dto_1.Creategraphic_editDto,
    }),
    common_1.Get(':type'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GraphicEditController.prototype, "getall", null);
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
], GraphicEditController.prototype, "deleteone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '修改一筆圖文資料(含一個圖片)',
        description: '修改一筆圖文資料(含一個圖片)',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiParam({ name: 'objectid', description: '60407a84144e9da9a8d89d14' }),
    swagger_1.ApiBody({
        description: '修改一筆圖文資料(含一個圖片)',
        type: update_graphic_editApi_dto_1.UpdateGraphic_editApiDto,
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
    __metadata("design:paramtypes", [Object, update_graphic_edit_dto_1.UpdateGraphic_editDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GraphicEditController.prototype, "uploadFile_updateGraphic_edit", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '新增一筆圖文資料(含一個圖片)',
        description: '新增一筆圖文資料(含一個圖片)',
    }),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiBody({
        description: '新增一筆圖文資料(含一個圖片)',
        type: graphic_edit_schema_1.Graphic_edit,
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
    __metadata("design:paramtypes", [Object, create_graphic_edit_dto_1.Creategraphic_editDto, Object]),
    __metadata("design:returntype", Promise)
], GraphicEditController.prototype, "uploadFile_createGraphic_edit", null);
GraphicEditController = __decorate([
    swagger_1.ApiTags('圖文'),
    common_1.Controller('graphic-edit'),
    __metadata("design:paramtypes", [graphic_edit_service_1.GraphicEditService])
], GraphicEditController);
exports.GraphicEditController = GraphicEditController;
//# sourceMappingURL=graphic-edit.controller.js.map