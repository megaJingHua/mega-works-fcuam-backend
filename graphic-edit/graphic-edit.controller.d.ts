import { GraphicEditService } from './graphic-edit.service';
import { Creategraphic_editDto } from './create-graphic_edit.dto';
import { UpdateGraphic_editDto } from './update-graphic_edit.dto';
export declare class GraphicEditController {
    private graphicEditService;
    constructor(graphicEditService: GraphicEditService);
    getall(params: any, res: any): Promise<string[]>;
    deleteone(params: any, res: any): Promise<any>;
    uploadFile_updateGraphic_edit(img: any, input_data: UpdateGraphic_editDto, res: any, params: any): Promise<any>;
    uploadFile_createGraphic_edit(img: any, input_data: Creategraphic_editDto, res: any): Promise<any>;
}
