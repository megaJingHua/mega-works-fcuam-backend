import { Test, TestingModule } from '@nestjs/testing';
import { ImgslideshowController } from './imgslideshow.controller';

describe('ImgslideshowController', () => {
  let controller: ImgslideshowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgslideshowController],
    }).compile();

    controller = module.get<ImgslideshowController>(ImgslideshowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
