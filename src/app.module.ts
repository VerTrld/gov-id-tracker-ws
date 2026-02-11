import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './user-account/user-account.module';
import { UploadModule } from './upload/upload.module';
import { GovernmentIdsModule } from './government-ids/government-ids.module';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/stategy/jwt.strategy';
import { UserRequirementModule } from './user-requirement/user-requirement.module';
import { RequirementModule } from './requirement/requirement.module';
import { RequireRequirementListModule } from './require-requirement-list/require-requirement-list.module';
import { RequirementListModule } from './requirement-list/requirement-list.module';
import { UserGovernmentIdsModule } from './user-government-ids/user-government-ids.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserAccountModule,
    UploadModule,
    GovernmentIdsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserRequirementModule,
    RequirementModule,
    RequireRequirementListModule,
    RequirementListModule,
    UserGovernmentIdsModule,
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
  // controllers: [AppController],
  // useClass: RolesGuard,
})
export class AppModule {}
