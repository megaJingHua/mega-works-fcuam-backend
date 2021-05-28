"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarModule = void 0;
const common_1 = require("@nestjs/common");
const navbar_controller_1 = require("./navbar.controller");
const navbar_service_1 = require("./navbar.service");
const mongoose_1 = require("@nestjs/mongoose");
const navbar_schema_1 = require("./navbar.schema");
const navbarchildern_schema_1 = require("./navbarchildern.schema");
const auth_module_1 = require("../auth/auth.module");
let NavbarModule = class NavbarModule {
};
NavbarModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: navbar_schema_1.Navbar.name, schema: navbar_schema_1.NavbarSchema },
                { name: navbarchildern_schema_1.Navbarchildern.name, schema: navbarchildern_schema_1.NavbarchildernSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [navbar_controller_1.NavbarController],
        providers: [navbar_service_1.NavbarService],
    })
], NavbarModule);
exports.NavbarModule = NavbarModule;
//# sourceMappingURL=navbar.module.js.map