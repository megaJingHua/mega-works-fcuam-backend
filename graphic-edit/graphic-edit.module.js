"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicEditModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const auth_module_1 = require("../auth/auth.module");
const graphic_edit_controller_1 = require("./graphic-edit.controller");
const graphic_edit_service_1 = require("./graphic-edit.service");
const graphic_edit_schema_1 = require("./graphic_edit.schema");
let GraphicEditModule = class GraphicEditModule {
};
GraphicEditModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.register({
                dest: path_1.join(__dirname, '../uploadfiles'),
            }),
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([
                { name: graphic_edit_schema_1.Graphic_edit.name, schema: graphic_edit_schema_1.Graphic_editSchema },
            ]),
        ],
        controllers: [graphic_edit_controller_1.GraphicEditController],
        providers: [graphic_edit_service_1.GraphicEditService],
    })
], GraphicEditModule);
exports.GraphicEditModule = GraphicEditModule;
//# sourceMappingURL=graphic-edit.module.js.map