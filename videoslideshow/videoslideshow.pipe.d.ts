import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class VideoslideshowPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
}
