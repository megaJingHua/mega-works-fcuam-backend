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
exports.NavbarSchema = exports.Navbar = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
let Navbar = class Navbar {
};
__decorate([
    mongoose_1.Prop({ unique: true }),
    __metadata("design:type", Number)
], Navbar.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Navbar.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Navbar.prototype, "url", void 0);
__decorate([
    mongoose_1.Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Navbarchildern' }] }),
    __metadata("design:type", Array)
], Navbar.prototype, "childern", void 0);
Navbar = __decorate([
    mongoose_1.Schema()
], Navbar);
exports.Navbar = Navbar;
exports.NavbarSchema = mongoose_1.SchemaFactory.createForClass(Navbar);
//# sourceMappingURL=navbar.schema.js.map