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
exports.ImgSlideshowSchema = exports.ImgSlideshow = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const create_img_slideshow_dto_1 = require("./create-img_slideshow.dto");
let ImgSlideshow = class ImgSlideshow {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], ImgSlideshow.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImgSlideshow.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImgSlideshow.prototype, "type_name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], ImgSlideshow.prototype, "updatetime", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", create_img_slideshow_dto_1.CreateImg_slideshowDto)
], ImgSlideshow.prototype, "img", void 0);
ImgSlideshow = __decorate([
    mongoose_1.Schema()
], ImgSlideshow);
exports.ImgSlideshow = ImgSlideshow;
exports.ImgSlideshowSchema = mongoose_1.SchemaFactory.createForClass(ImgSlideshow);
//# sourceMappingURL=imgslideshow.schema.js.map