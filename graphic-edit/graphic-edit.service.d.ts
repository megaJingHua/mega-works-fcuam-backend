import { Model } from 'mongoose';
import { Creategraphic_editDto } from './create-graphic_edit.dto';
import { Graphic_edit, Graphic_editDocument } from './graphic_edit.schema';
import { UpdateGraphic_editDto } from './update-graphic_edit.dto';
export declare class GraphicEditService {
    private Graphic_editModel;
    constructor(Graphic_editModel: Model<Graphic_editDocument>);
    find(type: number): Promise<any>;
    deleteOne(object_id: string): Promise<any>;
    updateone(updateGraphic_editDto: UpdateGraphic_editDto, img: any, baseurl: string, _id: string): Promise<any>;
    create(createArticleDto: Creategraphic_editDto, img: any, baseurl: string): Promise<Graphic_edit>;
}
