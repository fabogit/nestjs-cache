import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('AppService', () => {
  let appService: AppService;
  const mockCacheManager = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    clear: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [],
      exports: [],
      imports: [],
      providers: [
        AppService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
  });

  it('Should be defined', () => {
    expect(appService).toBeDefined();
  });
});
