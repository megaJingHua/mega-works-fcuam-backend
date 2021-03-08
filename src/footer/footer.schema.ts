/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';

export type FooterDocument = Footer & Document;

@Schema()
export class Footer {
  @Prop({unique:true})
  id: number;

  @Prop()
  role: string;

  @Prop()
  context: string;
}
export const FooterSchema = SchemaFactory.createForClass(Footer);
