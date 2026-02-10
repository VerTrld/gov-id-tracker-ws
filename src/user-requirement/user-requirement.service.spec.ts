import { Test, TestingModule } from '@nestjs/testing';
import { UserRequirementService } from './user-requirement.service';

describe('UserRequirementService', () => {
  let service: UserRequirementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRequirementService],
    }).compile();

    service = module.get<UserRequirementService>(UserRequirementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
