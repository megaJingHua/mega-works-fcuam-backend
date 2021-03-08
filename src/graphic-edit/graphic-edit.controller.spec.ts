import { Test, TestingModule } from '@nestjs/testing';
import { GraphicEditController } from './graphic-edit.controller';

describe('GraphicEditController', () => {
  let controller: GraphicEditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphicEditController],
    }).compile();

    controller = module.get<GraphicEditController>(GraphicEditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
