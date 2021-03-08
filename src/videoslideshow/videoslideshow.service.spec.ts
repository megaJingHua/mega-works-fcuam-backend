import { Test, TestingModule } from '@nestjs/testing';
import { VideoslideshowService } from './videoslideshow.service';

describe('VideoslideshowService', () => {
  let service: VideoslideshowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoslideshowService],
    }).compile();

    service = module.get<VideoslideshowService>(VideoslideshowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
