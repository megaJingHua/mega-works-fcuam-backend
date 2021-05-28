"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const footer_module_1 = require("./footer/footer.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const navbar_module_1 = require("./navbar/navbar.module");
const article_module_1 = require("./article/article.module");
const imgslideshow_module_1 = require("./imgslideshow/imgslideshow.module");
const videoslideshow_module_1 = require("./videoslideshow/videoslideshow.module");
const graphic_edit_module_1 = require("./graphic-edit/graphic-edit.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            footer_module_1.FooterModule,
            mongoose_1.MongooseModule.forRoot('mongodb+srv://sa:sa@cluster0.u37ih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            navbar_module_1.NavbarModule,
            article_module_1.ArticleModule,
            imgslideshow_module_1.ImgslideshowModule,
            videoslideshow_module_1.VideoslideshowModule,
            graphic_edit_module_1.GraphicEditModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map