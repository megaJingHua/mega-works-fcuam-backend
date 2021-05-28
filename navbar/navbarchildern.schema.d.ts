import { Document } from 'mongoose';
import { Navbar } from './navbar.schema';
import * as mongoose from 'mongoose';
export declare type NavbarchildernDocument = Navbarchildern & Document;
export declare class Navbarchildern {
    name: string;
    url: string;
    navbar: Navbar;
}
export declare const NavbarchildernSchema: mongoose.Schema<Document<Navbarchildern, any>, mongoose.Model<any, any, any>, undefined>;
