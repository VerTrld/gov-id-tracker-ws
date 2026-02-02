import { Module } from '@nestjs/common';
import { GovernmentIdsService } from './government-ids.service';
import { GovernmentIdsController } from './government-ids.controller';

@Module({
  controllers: [GovernmentIdsController],
  providers: [GovernmentIdsService],
})
export class GovernmentIdsModule {}
