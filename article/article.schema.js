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
exports.ArticleSchema = exports.Article = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const create_img_dto_1 = require("./create-img.dto");
const create_file_dto_1 = require("./create-file.dto");
let Article = class Article {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Article.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Article.prototype, "updatetime", void 0);
__decorate([
    mongoose_1.Prop([create_img_dto_1.CreateImgDto]),
    __metadata("design:type", Array)
], Article.prototype, "imgs", void 0);
__decorate([
    mongoose_1.Prop([create_file_dto_1.CreateFileDto]),
    __metadata("design:type", Array)
], Article.prototype, "files", void 0);
Article = __decorate([
    mongoose_1.Schema()
], Article);
exports.Article = Article;
exports.ArticleSchema = mongoose_1.SchemaFactory.createForClass(Article);
//# sourceMappingURL=article.schema.js.map