import { Model } from 'mongoose';
import { Navbar, NavbarDocument } from './navbar.schema';
import { NavbarchildernDocument } from './navbarchildern.schema';
import { CreateNavbarDto } from './create-navbar.dto';
export declare class NavbarService {
    private NavbarModel;
    private NavbarchildernModel;
    constructor(NavbarModel: Model<NavbarDocument>, NavbarchildernModel: Model<NavbarchildernDocument>);
    create(createNavbarDto: CreateNavbarDto): Promise<Navbar>;
    findAll(): Promise<any>;
    deletenavbar(): Promise<any>;
    deletenavbarchildern(): Promise<any>;
}
