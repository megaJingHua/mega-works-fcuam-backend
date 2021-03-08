import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { VideoslideshowController } from './videoslideshow.controller';
import { Videoslideshow, VideoslideshowSchema } from './videoslideshow.schema';
import { VideoslideshowService } from './videoslideshow.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Videoslideshow.name, schema: VideoslideshowSchema },
    ]),
  ],
  controllers: [VideoslideshowController],
  providers: [VideoslideshowService],
})
export class VideoslideshowModule {}
