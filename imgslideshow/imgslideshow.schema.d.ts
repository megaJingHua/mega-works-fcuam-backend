import { Document } from 'mongoose';
import { CreateImg_slideshowDto } from './create-img_slideshow.dto';
export declare type ImgSlideshowDocument = ImgSlideshow & Document;
export declare class ImgSlideshow {
    type: number;
    title: string;
    type_name: string;
    updatetime: string;
    img: CreateImg_slideshowDto;
}
export declare const ImgSlideshowSchema: import("mongoose").Schema<Document<ImgSlideshow, any>, import("mongoose").Model<any, any, any>, undefined>;
