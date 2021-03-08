/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import { Navbar } from './navbar.schema';
import * as mongoose from 'mongoose';
export type NavbarchildernDocument = Navbarchildern & Document;

@Schema()
export class Navbarchildern {
   
    @Prop()
     name: string;
  
    @Prop()
    url: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Navbar'})
    navbar: Navbar;
}
export const NavbarchildernSchema = SchemaFactory.createForClass(Navbarchildern);