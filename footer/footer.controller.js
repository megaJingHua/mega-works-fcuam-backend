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
exports.FooterController = void 0;
const common_1 = require("@nestjs/common");
const footer_service_1 = require("./footer.service");
const footer_pipe_1 = require("./footer.pipe");
const create_footer_dto_1 = require("./create-footer.dto");
const roles_decorator_1 = require("../user_role/roles.decorator");
const role_enum_1 = require("../user_role/role.enum");
const roles_guard_1 = require("../user_role/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const findone_format_1 = require("./findone.format");
const footerrole_enum_1 = require("./footerrole.enum");
const findall_format_1 = require("./findall.format");
let FooterController = class FooterController {
    constructor(footerService) {
        this.footerService = footerService;
    }
    async getone(params, res) {
        const data = await this.footerService.findone(params.roles);
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async getall(res) {
        const data = await this.footerService.findAll();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async addData(params, res, input_data) {
        const s_length = input_data;
        const s = s_length;
        let i;
        const count = s_length.length;
        const result_OK = 'OK';
        let resulterror = 0;
        let result;
        if (count == null || count == undefined) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Create and update Error !',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        for (i = 0; i < count; i++) {
            try {
                result = await this.footerService.createorupdate(s[i]);
            }
            catch (err) {
                resulterror += 1;
            }
        }
        if (resulterror != 0) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json('Create and update Error .');
        }
        else {
            return res.status(common_1.HttpStatus.CREATED).json(result_OK);
        }
    }
    async deleteone(params, res) {
        const result = await this.footerService.deleteOne(params.role);
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: '使用角色取得單一資料',
        description: '使用角色取得單一資料',
    }),
    swagger_1.ApiParam({ name: 'roles', description: '使用者role', enum: footerrole_enum_1.Rolefooter }),
    swagger_1.ApiOkResponse({
        description: '取得單一資料',
        type: findone_format_1.FindoneFormat,
    }),
    common_1.Get(':roles'),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FooterController.prototype, "getone", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '取得頁尾資料',
        description: '取得頁尾資料',
    }),
    swagger_1.ApiParam({ name: '不用參數', required: false }),
    swagger_1.ApiOkResponse({
        description: '取得頁尾資料',
        type: findall_format_1.FindAllFormat,
    }),
    common_1.Get(),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FooterController.prototype, "getall", null);
__decorate([
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOperation({
        summary: '新增頁尾資料',
        description: '新增頁尾資料',
    }),
    swagger_1.ApiBody({ type: [create_footer_dto_1.CreateFooterDto] }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    common_1.Post(),
    __param(0, common_1.Param()),
    __param(1, common_1.Response()),
    __param(2, common_1.Body(new footer_pipe_1.FooterPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], FooterController.prototype, "addData", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '使用角色刪除單一資料',
        description: '使用角色刪除單一資料',
    }),
    swagger_1.ApiParam({ name: 'roles', description: '使用者role', enum: footerrole_enum_1.Rolefooter }),
    swagger_1.ApiOkResponse({
        description: '刪除單一資料',
    }),
    swagger_1.ApiBearerAuth(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':role'),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FooterController.prototype, "deleteone", null);
FooterController = __decorate([
    swagger_1.ApiTags('Footer 頁尾'),
    common_1.Controller('footer'),
    __metadata("design:paramtypes", [footer_service_1.FooterService])
], FooterController);
exports.FooterController = FooterController;
//# sourceMappingURL=footer.controller.js.map