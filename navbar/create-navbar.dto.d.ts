import { CreateNavbarchildernDto } from './create-navbarchildern.dto';
export declare class CreateNavbarDto {
    id: number;
    readonly name: string;
    readonly url: string;
    readonly childern: CreateNavbarchildernDto[];
}
