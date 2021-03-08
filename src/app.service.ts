import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
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
}
