import { Model } from 'mongoose';
import { CreateVideoSlideshowDto } from './create-videoslideshow.dto';
import { Videoslideshow, VideoslideshowDocument } from './videoslideshow.schema';
export declare class VideoslideshowService {
    private VideoslideshowModel;
    constructor(VideoslideshowModel: Model<VideoslideshowDocument>);
    deleteOne(id: string): Promise<any>;
    findtype(type: number): Promise<any>;
    updateone(id: string, input_data: CreateVideoSlideshowDto): Promise<any>;
    create(createVideoSlideshow: CreateVideoSlideshowDto): Promise<Videoslideshow>;
}
