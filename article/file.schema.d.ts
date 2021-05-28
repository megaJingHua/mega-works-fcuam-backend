import { Document } from 'mongoose';
export declare type FileDocument = File & Document;
export declare class File {
    name: string;
    real_name: string;
    url: string;
}
export declare const FileSchema: import("mongoose").Schema<Document<File, any>, import("mongoose").Model<any, any, any>, undefined>;
