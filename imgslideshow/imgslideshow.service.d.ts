import { Model } from 'mongoose';
import { CreateImgSlideshowDto } from './create-imgslideshow.dto';
import { ImgSlideshow, ImgSlideshowDocument } from './imgslideshow.schema';
import { UpdateImgSlideshowDto } from './update-imgslideshow.dto';
export declare class ImgslideshowService {
    private ImgSlideshowModel;
    constructor(ImgSlideshowModel: Model<ImgSlideshowDocument>);
    find(type: number): Promise<any>;
    deleteOne(object_id: string): Promise<any>;
    updateone(updateImgSlideshowDto: UpdateImgSlideshowDto, img: any, baseurl: string, _id: string): Promise<any>;
    create(createArticleDto: CreateImgSlideshowDto, img: any, baseurl: string): Promise<ImgSlideshow>;
}
