/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import { Navbarchildern } from './navbarchildern.schema';
import * as mongoose from 'mongoose';
export type NavbarDocument = Navbar & Document;

@Schema()
export class Navbar {
    @Prop({unique:true})
    id: number;
  
    @Prop()
     name: string;
  
    @Prop()
    url: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Navbarchildern' }] })
    childern: Navbarchildern[];
}
export const NavbarSchema = SchemaFactory.createForClass(Navbar);