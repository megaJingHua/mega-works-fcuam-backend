import { Document } from 'mongoose';
export declare type ImgDocument = Img & Document;
export declare class Img {
    real_name: string;
    url: string;
}
export declare const ImgSchema: import("mongoose").Schema<Document<Img, any>, import("mongoose").Model<any, any, any>, undefined>;
