"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterModule = void 0;
const common_1 = require("@nestjs/common");
const footer_service_1 = require("./footer.service");
const footer_controller_1 = require("./footer.controller");
const footer_schema_1 = require("./footer.schema");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
let FooterModule = class FooterModule {
};
FooterModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: footer_schema_1.Footer.name, schema: footer_schema_1.FooterSchema }]),
            auth_module_1.AuthModule,
        ],
        providers: [footer_service_1.FooterService],
        controllers: [footer_controller_1.FooterController],
    })
], FooterModule);
exports.FooterModule = FooterModule;
//# sourceMappingURL=footer.module.js.map