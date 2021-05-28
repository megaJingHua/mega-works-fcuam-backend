import { Article, ArticleDocument } from './article.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';
export declare class ArticleService {
    private ArticleModel;
    constructor(ArticleModel: Model<ArticleDocument>);
    findall(): Promise<any>;
    findone(object_id: string): Promise<any>;
    deleteOne(object_id: string): Promise<any>;
    updateone(updateArticleDto: UpdateArticleDto, imgs: any, files: any, baseurl: string, filepath: string): Promise<any>;
    create(createArticleDto: CreateArticleDto, imgs: any, files: any, baseurl: string, filepath: string): Promise<Article>;
}
