import { CreateVideoSlideshowDto } from './create-videoslideshow.dto';
import { VideoslideshowService } from './videoslideshow.service';
export declare class VideoslideshowController {
    private videoslideshowService;
    constructor(videoslideshowService: VideoslideshowService);
    deleteone(params: any, res: any): Promise<any>;
    getall(params: any, res: any): Promise<string[]>;
    updateone(params: any, res: any, input_data: CreateVideoSlideshowDto): Promise<any>;
    addData(params: any, res: any, input_data: CreateVideoSlideshowDto): Promise<any>;
}
