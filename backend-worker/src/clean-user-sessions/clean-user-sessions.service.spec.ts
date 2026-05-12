import { Test, TestingModule } from '@nestjs/testing';
import { CleanUserSessionsService } from './clean-user-sessions.service';

describe('CleanUserSessionsService', () => {
  let service: CleanUserSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleanUserSessionsService],
    }).compile();

    service = module.get<CleanUserSessionsService>(CleanUserSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
