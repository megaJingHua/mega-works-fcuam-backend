import { CreateImgSlideshowDto } from './create-imgslideshow.dto';
import { ImgslideshowService } from './imgslideshow.service';
import { UpdateImgSlideshowDto } from './update-imgslideshow.dto';
export declare class ImgslideshowController {
    private imgSlideshowService;
    constructor(imgSlideshowService: ImgslideshowService);
    getall(params: any, res: any): Promise<string[]>;
    deleteone(params: any, res: any): Promise<any>;
    uploadFile_updateImgSlideshow(img: any, input_data: UpdateImgSlideshowDto, res: any, params: any): Promise<any>;
    uploadFile_createImgSlideshow(img: any, input_data: CreateImgSlideshowDto, res: any): Promise<any>;
}
