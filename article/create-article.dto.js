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
exports.CreateArticleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateArticleDto {
}
__decorate([
    swagger_1.ApiProperty({ description: 'type', example: 1 }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'title', example: '恭喜「2019商業模式與大數據分析競賽」獲獎' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiHideProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "updatetime", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'content', example: '恭喜林英志、陳亭甫老師指導本系學生<br><br>【好運急數來】：蕭孟平、陳林泰、陳昶霓、童子祐<br>【嬰數花再提煉】：劉博弘、張家瑋、黃芝音、陳宏羲<br><br>參加「2019第二屆商業模式與大數據分析競賽-人工智慧金融挑戰賽」獲得優選。網址：<a href=\"https://bba.cm.nsysu.edu.tw/\">https://bba.cm.nsysu.edu.tw/</a>| 可寫html標籤' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'imgs', type: 'array', items: { type: 'string', format: 'binary' } }),
    __metadata("design:type", Array)
], CreateArticleDto.prototype, "imgs", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'files', type: 'array', items: { type: 'string', format: 'binary' } }),
    __metadata("design:type", Array)
], CreateArticleDto.prototype, "files", void 0);
exports.CreateArticleDto = CreateArticleDto;
//# sourceMappingURL=create-article.dto.js.map