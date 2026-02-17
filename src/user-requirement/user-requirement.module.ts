import { Module } from '@nestjs/common';
import { UserRequirementsService } from './user-requirement.service';
import { UserRequirementsController } from './user-requirement.controller';

@Module({
  controllers: [UserRequirementsController],
  providers: [UserRequirementsService],
})
export class UserRequirementModule {}
