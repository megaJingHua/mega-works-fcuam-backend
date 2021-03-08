import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { FooterModule } from './footer/footer.module';
import { env } from 'process';
import { NavbarModule } from './navbar/navbar.module';
import { ArticleModule } from './article/article.module';
import { GraphicEditModule } from './graphic-edit/graphic-edit.module';
import { ImgslideshowModule } from './imgslideshow/imgslideshow.module';
import { VideoslideshowModule } from './videoslideshow/videoslideshow.module';
async function bootstrap() {
  //建立檔案上傳資料夾
  const exit = await fs.existsSync(join(__dirname, '/uploadfiles/'));
  if (!exit) {
    fs.mkdirSync(join(__dirname, '/uploadfiles/'));
  }
  //設定憑證跟KEY
  const httpsOptions = {
    key: fs.readFileSync('src/secrets/server.key'),
    cert: fs.readFileSync('src/secrets/server.crt'),
  };
  /*
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });*/
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    /* httpsOptions,*/
  });
  app.enableCors();
  //靜態文件的middleware,允許使用URL直接拿到檔案
  app.useStaticAssets(join(__dirname, '/uploadfiles/'), {
    prefix: '/public/', //设置虚拟路径
  });

  ////open api/footer start
  const config = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('footer')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [FooterModule],
  });
  SwaggerModule.setup('api/footer', app, document);
  //open api/footer end

  ////open api/Login start
  const config2 = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Login 登入')
    .build();
  const document2 = SwaggerModule.createDocument(app, config2, {
    include: [AppModule],
  });
  SwaggerModule.setup('api/login', app, document2);
  //open api/Login end
  ////open api/navbar start
  const config3 = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Menu')
    .build();
  const document3 = SwaggerModule.createDocument(app, config3, {
    include: [NavbarModule],
  });
  SwaggerModule.setup('api/navbar', app, document3);
  //open api/navbar end
  ////open api/article start
  const config4 = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Article')
    .build();
  const document4 = SwaggerModule.createDocument(app, config4, {
    include: [ArticleModule],
  });
  SwaggerModule.setup('api/article', app, document4);
  //open api/article end
  ////open api/graphic-edit start
  const config5 = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Graphic-edit')
    .build();
  const document5 = SwaggerModule.createDocument(app, config5, {
    include: [GraphicEditModule],
  });
  SwaggerModule.setup('api/graphic-edit', app, document5);
  //open api/graphic-edit end
  ////open api/imgslideshow start
  const config6 = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('圖片輪播')
    .build();
  const document6 = SwaggerModule.createDocument(app, config6, {
    include: [ImgslideshowModule],
  });
  SwaggerModule.setup('api/imgslideshow', app, document6);
  //open api/imgslideshow end
  ////open api/videoslideshow start
  const config7 = new DocumentBuilder()
    .setTitle('Fcu-University')
    .setDescription('Fcu-University description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('影片輪播')
    .build();
  const document7 = SwaggerModule.createDocument(app, config7, {
    include: [VideoslideshowModule],
  });
  SwaggerModule.setup('api/videoslideshow', app, document7);
  //open api/videoslideshow end
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  const app_url_str = await app.getUrl();
  //global.app_url_public = app_url_str + '/public/';
  env.app_url_public = app_url_str + '/public/';
}
bootstrap();
