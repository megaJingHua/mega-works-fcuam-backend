import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class FooterPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
    private toValidate;
}
