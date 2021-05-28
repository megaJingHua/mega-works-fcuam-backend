import { Document } from 'mongoose';
export declare type FooterDocument = Footer & Document;
export declare class Footer {
    id: number;
    role: string;
    context: string;
}
export declare const FooterSchema: import("mongoose").Schema<Document<Footer, any>, import("mongoose").Model<any, any, any>, undefined>;
