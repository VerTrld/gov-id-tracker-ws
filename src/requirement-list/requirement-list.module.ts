import { Module } from '@nestjs/common';
import { RequirementListService } from './requirement-list.service';
import { RequirementListController } from './requirement-list.controller';

@Module({
  controllers: [RequirementListController],
  providers: [RequirementListService],
})
export class RequirementListModule {}
