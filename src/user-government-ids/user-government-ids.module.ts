import { Module } from '@nestjs/common';
import { UserGovernmentIdsService } from './user-government-ids.service';
import { UserGovernmentIdsController } from './user-government-ids.controller';

@Module({
  controllers: [UserGovernmentIdsController],
  providers: [UserGovernmentIdsService],
})
export class UserGovernmentIdsModule {}
