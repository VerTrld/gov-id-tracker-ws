import { Module } from '@nestjs/common';
import { RequirementGovernmentIdsService } from './requirement-government-ids.service';
import { RequirementGovernmentIdsController } from './requirement-government-ids.controller';

@Module({
  controllers: [RequirementGovernmentIdsController],
  providers: [RequirementGovernmentIdsService],
})
export class RequirementGovernmentIdsModule {}
