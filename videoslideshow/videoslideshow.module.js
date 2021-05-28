"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoslideshowModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const videoslideshow_controller_1 = require("./videoslideshow.controller");
const videoslideshow_schema_1 = require("./videoslideshow.schema");
const videoslideshow_service_1 = require("./videoslideshow.service");
let VideoslideshowModule = class VideoslideshowModule {
};
VideoslideshowModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([
                { name: videoslideshow_schema_1.Videoslideshow.name, schema: videoslideshow_schema_1.VideoslideshowSchema },
            ]),
        ],
        controllers: [videoslideshow_controller_1.VideoslideshowController],
        providers: [videoslideshow_service_1.VideoslideshowService],
    })
], VideoslideshowModule);
exports.VideoslideshowModule = VideoslideshowModule;
//# sourceMappingURL=videoslideshow.module.js.map