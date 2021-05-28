import { Document } from 'mongoose';
import { Navbarchildern } from './navbarchildern.schema';
import * as mongoose from 'mongoose';
export declare type NavbarDocument = Navbar & Document;
export declare class Navbar {
    id: number;
    name: string;
    url: string;
    childern: Navbarchildern[];
}
export declare const NavbarSchema: mongoose.Schema<Document<Navbar, any>, mongoose.Model<any, any, any>, undefined>;
