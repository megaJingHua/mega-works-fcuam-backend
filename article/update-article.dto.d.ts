import { CreateImgDto } from './create-img.dto';
import { CreateFileDto } from './create-file.dto';
export declare class UpdateArticleDto {
    id: string;
    type: number;
    title: string;
    updatetime: string;
    content: string;
    delete_img_url: string[];
    delete_file_url: string[];
    imgs: CreateImgDto[];
    files: CreateFileDto[];
}
