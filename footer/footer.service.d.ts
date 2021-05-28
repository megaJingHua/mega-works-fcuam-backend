import { Footer, FooterDocument } from './footer.schema';
import { footer_text } from './footer_data_formate';
import { Model } from 'mongoose';
import { CreateFooterDto } from './create-footer.dto';
export declare class FooterService {
    private FooterModel;
    constructor(FooterModel: Model<FooterDocument>);
    create(createFootDto: CreateFooterDto): Promise<Footer>;
    findAll(): Promise<any>;
    findone(role_type: string): Promise<any>;
    updateone(role_type: string, context_str: CreateFooterDto): Promise<any>;
    deleteOne(role_type: string): Promise<any>;
    createorupdate(createFootDto: CreateFooterDto): Promise<Footer>;
    getdata(): footer_text[];
}
