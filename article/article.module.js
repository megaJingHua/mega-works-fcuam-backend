"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModule = void 0;
const common_1 = require("@nestjs/common");
const article_controller_1 = require("./article.controller");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const article_service_1 = require("./article.service");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const article_schema_1 = require("./article.schema");
let ArticleModule = class ArticleModule {
};
ArticleModule = __decorate([
    common_1.Module({
        controllers: [article_controller_1.ArticleController],
        imports: [
            platform_express_1.MulterModule.register({
                dest: path_1.join(__dirname, '../uploadfiles'),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: article_schema_1.Article.name, schema: article_schema_1.ArticleSchema }]),
            auth_module_1.AuthModule,
        ],
        providers: [article_service_1.ArticleService],
    })
], ArticleModule);
exports.ArticleModule = ArticleModule;
//# sourceMappingURL=article.module.js.map