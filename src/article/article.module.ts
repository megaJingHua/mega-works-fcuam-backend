import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Article, ArticleSchema } from './article.schema';

@Module({
  controllers: [ArticleController],
  imports: [
    MulterModule.register({
      dest: join(__dirname, '../uploadfiles'),
    }),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    AuthModule,
  ],
  providers: [ArticleService],
})
export class ArticleModule {}
