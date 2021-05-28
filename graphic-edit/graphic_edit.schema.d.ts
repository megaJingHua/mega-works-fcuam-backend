import { Document } from 'mongoose';
import { CreateImg_img_graphic_editDto } from './create-img_graphic_edit.dto';
export declare type Graphic_editDocument = Graphic_edit & Document;
export declare class Graphic_edit {
    type: number;
    title: string;
    updatetime: string;
    content: string;
    img: CreateImg_img_graphic_editDto;
}
export declare const Graphic_editSchema: import("mongoose").Schema<Document<Graphic_edit, any>, import("mongoose").Model<any, any, any>, undefined>;
