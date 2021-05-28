import { CreateImgDto } from './create-img.dto';
import { CreateFileDto } from './create-file.dto';
export declare class CreateArticleDto {
    type: number;
    title: string;
    updatetime: string;
    content: string;
    imgs: CreateImgDto[];
    files: CreateFileDto[];
}
