import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FooterModule } from './footer/footer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NavbarModule } from './navbar/navbar.module';
import { ArticleModule } from './article/article.module';
import { ImgslideshowModule } from './imgslideshow/imgslideshow.module';
import { VideoslideshowModule } from './videoslideshow/videoslideshow.module';
import { GraphicEditModule } from './graphic-edit/graphic-edit.module';

@Module({
  imports: [
    FooterModule,
    /*
    MongooseModule.forRoot('mongodb://localhost/nest'),
    */
    MongooseModule.forRoot(
      'mongodb+srv://sa:sa@cluster0.u37ih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
    NavbarModule,
    ArticleModule,
    ImgslideshowModule,
    VideoslideshowModule,
    GraphicEditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
