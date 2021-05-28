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
exports.CreateFooterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFooterDto {
}
__decorate([
    swagger_1.ApiProperty({ description: 'id', example: 1 }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateFooterDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'role', example: 'title' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFooterDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'context', example: '測試' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFooterDto.prototype, "context", void 0);
exports.CreateFooterDto = CreateFooterDto;
//# sourceMappingURL=create-footer.dto.js.map