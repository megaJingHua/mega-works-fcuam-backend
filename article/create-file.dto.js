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
exports.CreateFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFileDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: 'name',
        example: 'iconfinder_payment_method_card_visa_206684.svg',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'real_name',
        example: '1614843321549-iconfinder_payment_method_card_visa_206684.svg',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "real_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'url',
        example: 'http://127.0.0.1:3000/public/1614843321549-iconfinder_payment_method_card_visa_206684.svg',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "url", void 0);
exports.CreateFileDto = CreateFileDto;
//# sourceMappingURL=create-file.dto.js.map