import { Test, TestingModule } from '@nestjs/testing';
import { ImgslideshowService } from './imgslideshow.service';

describe('ImgslideshowService', () => {
  let service: ImgslideshowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgslideshowService],
    }).compile();

    service = module.get<ImgslideshowService>(ImgslideshowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
