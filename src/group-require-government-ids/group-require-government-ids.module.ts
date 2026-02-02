import { Module } from '@nestjs/common';
import { GroupRequireGovernmentIdsService } from './group-require-government-ids.service';
import { GroupRequireGovernmentIdsController } from './group-require-government-ids.controller';

@Module({
  controllers: [GroupRequireGovernmentIdsController],
  providers: [GroupRequireGovernmentIdsService],
})
export class GroupRequireGovernmentIdsModule {}
