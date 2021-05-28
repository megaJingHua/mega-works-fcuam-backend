import { NavbarService } from './navbar.service';
import { CreateNavbarDto } from './create-navbar.dto';
export declare class NavbarController {
    private navbarService;
    constructor(navbarService: NavbarService);
    getall(res: any): Promise<string[]>;
    addData(params: any, res: any, input_data: CreateNavbarDto[]): Promise<any>;
    deleteone(params: any, res: any): Promise<any>;
}
