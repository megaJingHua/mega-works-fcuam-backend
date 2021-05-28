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
exports.UpdateImgSlideshowApiDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_img_slideshow_dto_1 = require("./create-img_slideshow.dto");
class UpdateImgSlideshowApiDto {
}
__decorate([
    swagger_1.ApiProperty({ description: 'type', example: 1 }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateImgSlideshowApiDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'type_name', example: '類別名稱' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateImgSlideshowApiDto.prototype, "type_name", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'title', example: '圖片名稱' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateImgSlideshowApiDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiHideProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateImgSlideshowApiDto.prototype, "updatetime", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: '沒有Url代表刪掉原來的圖片',
        example: 'http://127.0.0.1:3000/public/1614844869055-main.jpg',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateImgSlideshowApiDto.prototype, "url", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'img',
        type: 'string',
        format: 'binary',
    }),
    __metadata("design:type", create_img_slideshow_dto_1.CreateImg_slideshowDto)
], UpdateImgSlideshowApiDto.prototype, "img", void 0);
exports.UpdateImgSlideshowApiDto = UpdateImgSlideshowApiDto;
//# sourceMappingURL=update-imgslideshowApi.dto.js.map