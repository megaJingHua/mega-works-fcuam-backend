import { Document } from 'mongoose';
export declare type VideoslideshowDocument = Videoslideshow & Document;
export declare class Videoslideshow {
    type: number;
    type_name: string;
    title: string;
    updatetime: string;
    url: string;
}
export declare const VideoslideshowSchema: import("mongoose").Schema<Document<Videoslideshow, any>, import("mongoose").Model<any, any, any>, undefined>;
