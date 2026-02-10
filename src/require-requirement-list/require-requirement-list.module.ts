import { Module } from '@nestjs/common';
import { RequireRequirementListService } from './require-requirement-list.service';
import { RequireRequirementListController } from './require-requirement-list.controller';

@Module({
  controllers: [RequireRequirementListController],
  providers: [RequireRequirementListService],
})
export class RequireRequirementListModule {}
