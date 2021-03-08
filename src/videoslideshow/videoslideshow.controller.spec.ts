import { Test, TestingModule } from '@nestjs/testing';
import { VideoslideshowController } from './videoslideshow.controller';

describe('VideoslideshowController', () => {
  let controller: VideoslideshowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoslideshowController],
    }).compile();

    controller = module.get<VideoslideshowController>(VideoslideshowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
