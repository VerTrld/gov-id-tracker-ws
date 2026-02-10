import { Module } from '@nestjs/common';
import { UserRequirementService } from './user-requirement.service';
import { UserRequirementController } from './user-requirement.controller';

@Module({
  controllers: [UserRequirementController],
  providers: [UserRequirementService],
})
export class UserRequirementModule {}
