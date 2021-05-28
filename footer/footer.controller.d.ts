import { FooterService } from './footer.service';
import { CreateFooterDto } from './create-footer.dto';
export declare class FooterController {
    private footerService;
    constructor(footerService: FooterService);
    getone(params: any, res: any): Promise<string[]>;
    getall(res: any): Promise<string[]>;
    addData(params: any, res: any, input_data: CreateFooterDto[]): Promise<any>;
    deleteone(params: any, res: any): Promise<any>;
}
