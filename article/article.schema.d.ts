import { Document } from 'mongoose';
import { CreateImgDto } from './create-img.dto';
import { CreateFileDto } from './create-file.dto';
export declare type ArticleDocument = Article & Document;
export declare class Article {
    type: number;
    title: string;
    content: string;
    updatetime: string;
    imgs: CreateImgDto[];
    files: CreateFileDto[];
}
export declare const ArticleSchema: import("mongoose").Schema<Document<Article, any>, import("mongoose").Model<any, any, any>, undefined>;
