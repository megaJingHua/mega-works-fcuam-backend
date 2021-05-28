"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        const s = `
    <h1>API 路徑</h1>
    <table>
    <tr>
      <th>Name</th>
      <th>path</th>
    </tr>
    <tr>
      <td>Footer</td>
      <td>api/footer</td>
    </tr>
    <tr>
      <td>Login</td>
      <td>api/login</td>
    </tr>
    <tr>
      <td>Menu</td>
      <td>api/navbar</td>
    </tr>
    <tr>
      <td>文章編輯</td>
      <td>api/article</td>
    </tr>
    <tr>
      <td>圖文</td>
      <td>api/graphic-edit</td>
    </tr>
    <tr>
    <td>圖片輪播</td>
    <td>api/imgslideshow</td>
  </tr>
  <tr>
    <td>影片輪播</td>
    <td>api/videoslideshow</td>
  </tr>
  </table> 
  
  <style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
  `;
        return s;
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map