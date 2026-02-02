import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './user-account/user-account.module';
import { UploadModule } from './upload/upload.module';
import { GovernmentIdsModule } from './government-ids/government-ids.module';
import { UserGovernmentIdsModule } from './user-government-ids/user-government-ids.module';
import { RequirementGovernmentIdsModule } from './requirement-government-ids/requirement-government-ids.module';
import { GroupRequireGovernmentIdsModule } from './group-require-government-ids/group-require-government-ids.module';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserAccountModule,
    UploadModule,
    GovernmentIdsModule,
    UserGovernmentIdsModule,
    RequirementGovernmentIdsModule,
    GroupRequireGovernmentIdsModule,
  ],
  // controllers: [AppController],
  // useClass: RolesGuard,
})
export class AppModule {}
