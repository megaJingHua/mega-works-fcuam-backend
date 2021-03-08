import { Test, TestingModule } from '@nestjs/testing';
import { GraphicEditService } from './graphic-edit.service';

describe('GraphicEditService', () => {
  let service: GraphicEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphicEditService],
    }).compile();

    service = module.get<GraphicEditService>(GraphicEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
