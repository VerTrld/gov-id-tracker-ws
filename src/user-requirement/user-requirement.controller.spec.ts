import { Test, TestingModule } from '@nestjs/testing';
import { UserRequirementController } from './user-requirement.controller';
import { UserRequirementService } from './user-requirement.service';

describe('UserRequirementController', () => {
  let controller: UserRequirementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRequirementController],
      providers: [UserRequirementService],
    }).compile();

    controller = module.get<UserRequirementController>(UserRequirementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
