import { CreateArticleDto } from './create-article.dto';
import { ArticleService } from './article.service';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    getoneArticle(params: any, res: any): Promise<string[]>;
    getallArticle(params: any, res: any): Promise<string[]>;
    deleteone(params: any, res: any): Promise<any>;
    updateone(files: any, res: any, params: any, input_data: any): Promise<any>;
    uploadFile_createArticle(files: any, input_data: CreateArticleDto, res: any): Promise<any>;
}
