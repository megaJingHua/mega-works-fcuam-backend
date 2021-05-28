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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNavbarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_navbarchildern_dto_1 = require("./create-navbarchildern.dto");
class CreateNavbarDto {
}
__decorate([
    swagger_1.ApiProperty({ description: 'id', example: 1 }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateNavbarDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'name', example: '關於本系' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNavbarDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'url', example: '/about' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateNavbarDto.prototype, "url", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'childern',
        example: "[{'name':'系史','url':'/history'},{'name':'系史2','url':'/history2'}] 雙引號拿掉變成陣列  ,單引號變雙引號",
        type: [create_navbarchildern_dto_1.CreateNavbarchildernDto],
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], CreateNavbarDto.prototype, "childern", void 0);
exports.CreateNavbarDto = CreateNavbarDto;
//# sourceMappingURL=create-navbar.dto.js.map