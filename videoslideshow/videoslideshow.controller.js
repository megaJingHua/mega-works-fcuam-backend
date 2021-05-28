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
exports.VideoslideshowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_enum_1 = require("../user_role/role.enum");
const roles_decorator_1 = require("../user_role/roles.decorator");
const roles_guard_1 = require("../user_role/roles.guard");
const create_videoslideshow_dto_1 = require("./create-videoslideshow.dto");
const videoslideshow_pipe_1 = require("./videoslideshow.pipe");
const videoslideshow_service_1 = require("./videoslideshow.service");
let VideoslideshowController = class VideoslideshowController {
    constructor(videoslideshowService) {
        this.videoslideshowService = videoslideshowService;
    }
    async deleteone(params, res) {
        const result = await this.videoslideshowService.deleteOne(params.id);
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
    async getall(params, res) {
        const data = await this.videoslideshowService.findtype(params.type);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async updateone(params, res, input_data) {
        const video_data = input_data;
        const result = await this.videoslideshowService.updateone(params.id, video_data);
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
    async addData(params, res, input_data) {
        const video_data = input_data;
        const data = await this.videoslideshowService.create(video_data);
        if (data != null || data != undefined) {
            return res.status(common_1.HttpStatus.CREATED).json(data);
        }
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: '刪除單一資料',
        description: '刪除單一資料',
    }),
    swagger_1.ApiParam({ name: 'id', description: '' }),
    swagger_1.ApiOkResponse({
        description: '刪除單一資料',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoslideshowController.prototype, "deleteone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '取得Type影片輪播資料',
        description: '取得Type影片輪播資料',
    }),
    swagger_1.ApiParam({ name: 'type', description: '' }),
    swagger_1.ApiOkResponse({
        description: '取得Type影片輪播資料',
        type: create_videoslideshow_dto_1.CreateVideoSlideshowDto,
    }),
    common_1.Get(':type'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoslideshowController.prototype, "getall", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '修改一筆影片輪播',
        description: '修改一筆影片輪播',
    }),
    swagger_1.ApiParam({ name: 'id', description: '60407a84144e9da9a8d89d14' }),
    swagger_1.ApiBody({
        description: '修改一筆影片輪播',
        type: create_videoslideshow_dto_1.CreateVideoSlideshowDto,
    }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(':id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Res()),
    __param(2, common_1.Body(new videoslideshow_pipe_1.VideoslideshowPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_videoslideshow_dto_1.CreateVideoSlideshowDto]),
    __metadata("design:returntype", Promise)
], VideoslideshowController.prototype, "updateone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '新增影片輪播資料',
        description: '新增影片輪播資料',
    }),
    swagger_1.ApiBody({ type: create_videoslideshow_dto_1.CreateVideoSlideshowDto }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Param()),
    __param(1, common_1.Res()),
    __param(2, common_1.Body(new videoslideshow_pipe_1.VideoslideshowPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_videoslideshow_dto_1.CreateVideoSlideshowDto]),
    __metadata("design:returntype", Promise)
], VideoslideshowController.prototype, "addData", null);
VideoslideshowController = __decorate([
    common_1.Controller('videoslideshow'),
    __metadata("design:paramtypes", [videoslideshow_service_1.VideoslideshowService])
], VideoslideshowController);
exports.VideoslideshowController = VideoslideshowController;
//# sourceMappingURL=videoslideshow.controller.js.map