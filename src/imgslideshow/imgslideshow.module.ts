import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { ImgslideshowController } from './imgslideshow.controller';
import { ImgSlideshow, ImgSlideshowSchema } from './imgslideshow.schema';
import { ImgslideshowService } from './imgslideshow.service';

@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '../uploadfiles'),
    }),
    AuthModule,
    MongooseModule.forFeature([
      { name: ImgSlideshow.name, schema: ImgSlideshowSchema },
    ]),
  ],
  controllers: [ImgslideshowController],
  providers: [ImgslideshowService],
})
export class ImgslideshowModule {}
