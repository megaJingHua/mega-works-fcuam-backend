"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const footer_module_1 = require("./footer/footer.module");
const process_1 = require("process");
const navbar_module_1 = require("./navbar/navbar.module");
const article_module_1 = require("./article/article.module");
const graphic_edit_module_1 = require("./graphic-edit/graphic-edit.module");
const imgslideshow_module_1 = require("./imgslideshow/imgslideshow.module");
const videoslideshow_module_1 = require("./videoslideshow/videoslideshow.module");
async function bootstrap() {
    const exit = await fs.existsSync(path_1.join(__dirname, '/uploadfiles/'));
    if (!exit) {
        fs.mkdirSync(path_1.join(__dirname, '/uploadfiles/'));
    }
    const httpsOptions = {
        key: fs.readFileSync('src/secrets/server.key'),
        cert: fs.readFileSync('src/secrets/server.crt'),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    app.enableCors();
    app.useStaticAssets(path_1.join(__dirname, '/uploadfiles/'), {
        prefix: '/public/',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('footer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [footer_module_1.FooterModule],
    });
    swagger_1.SwaggerModule.setup('api/footer', app, document);
    const config2 = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Login 登入')
        .build();
    const document2 = swagger_1.SwaggerModule.createDocument(app, config2, {
        include: [app_module_1.AppModule],
    });
    swagger_1.SwaggerModule.setup('api/login', app, document2);
    const config3 = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Menu')
        .build();
    const document3 = swagger_1.SwaggerModule.createDocument(app, config3, {
        include: [navbar_module_1.NavbarModule],
    });
    swagger_1.SwaggerModule.setup('api/navbar', app, document3);
    const config4 = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Article')
        .build();
    const document4 = swagger_1.SwaggerModule.createDocument(app, config4, {
        include: [article_module_1.ArticleModule],
    });
    swagger_1.SwaggerModule.setup('api/article', app, document4);
    const config5 = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Graphic-edit')
        .build();
    const document5 = swagger_1.SwaggerModule.createDocument(app, config5, {
        include: [graphic_edit_module_1.GraphicEditModule],
    });
    swagger_1.SwaggerModule.setup('api/graphic-edit', app, document5);
    const config6 = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('圖片輪播')
        .build();
    const document6 = swagger_1.SwaggerModule.createDocument(app, config6, {
        include: [imgslideshow_module_1.ImgslideshowModule],
    });
    swagger_1.SwaggerModule.setup('api/imgslideshow', app, document6);
    const config7 = new swagger_1.DocumentBuilder()
        .setTitle('Fcu-University')
        .setDescription('Fcu-University description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('影片輪播')
        .build();
    const document7 = swagger_1.SwaggerModule.createDocument(app, config7, {
        include: [videoslideshow_module_1.VideoslideshowModule],
    });
    swagger_1.SwaggerModule.setup('api/videoslideshow', app, document7);
    await app.listen(process.env.PORT || 3000, '0.0.0.0');
    const app_url_str = await app.getUrl();
    process_1.env.app_url_public = app_url_str + '/public/';
}
bootstrap();
//# sourceMappingURL=main.js.map