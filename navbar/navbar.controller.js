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
exports.NavbarController = void 0;
const common_1 = require("@nestjs/common");
const navbar_service_1 = require("./navbar.service");
const roles_decorator_1 = require("../user_role/roles.decorator");
const role_enum_1 = require("../user_role/role.enum");
const roles_guard_1 = require("../user_role/roles.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const navbar_pipe_1 = require("./navbar.pipe");
const create_navbar_dto_1 = require("./create-navbar.dto");
const swagger_1 = require("@nestjs/swagger");
let NavbarController = class NavbarController {
    constructor(navbarService) {
        this.navbarService = navbarService;
    }
    async getall(res) {
        const data = await this.navbarService.findAll();
        return res.status(common_1.HttpStatus.OK).json(data);
    }
    async addData(params, res, input_data) {
        const s = input_data;
        let resulterror = 0;
        const count = s.length;
        let i;
        const result_OK = 'OK';
        let result;
        const navbar_delete = await this.navbarService.deletenavbar();
        const childern_delete = await this.navbarService.deletenavbarchildern();
        if (!navbar_delete || !childern_delete) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json('Delte navbar and childern Error .');
        }
        for (i = 0; i < count; i++) {
            try {
                result = await this.navbarService.create(s[i]);
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
        const result = await this.navbarService.deletenavbar();
        return res.status(common_1.HttpStatus.CREATED).json(result);
    }
};
__decorate([
    swagger_1.ApiOperation({
        summary: '取得Menu',
        description: '取得Menu',
    }),
    swagger_1.ApiParam({ name: '不用參數', required: false }),
    swagger_1.ApiOkResponse({
        description: '取得Menu',
        type: [create_navbar_dto_1.CreateNavbarDto],
    }),
    common_1.Get(),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NavbarController.prototype, "getall", null);
__decorate([
    swagger_1.ApiOperation({
        summary: '新增Menu資料',
        description: '新增Menu資料',
    }),
    swagger_1.ApiBody({ type: [create_navbar_dto_1.CreateNavbarDto] }),
    swagger_1.ApiCreatedResponse({
        description: '連結成功建立,其實就是201狀態的描述',
    }),
    swagger_1.ApiBearerAuth(),
    common_1.Post(),
    __param(0, common_1.Param()),
    __param(1, common_1.Response()),
    __param(2, common_1.Body(new navbar_pipe_1.NavbarPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Array]),
    __metadata("design:returntype", Promise)
], NavbarController.prototype, "addData", null);
__decorate([
    swagger_1.ApiExcludeEndpoint(),
    roles_decorator_1.Roles(role_enum_1.Role.Admin),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(),
    __param(0, common_1.Param()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NavbarController.prototype, "deleteone", null);
NavbarController = __decorate([
    swagger_1.ApiTags('Menu'),
    common_1.Controller('navbar'),
    __metadata("design:paramtypes", [navbar_service_1.NavbarService])
], NavbarController);
exports.NavbarController = NavbarController;
//# sourceMappingURL=navbar.controller.js.map