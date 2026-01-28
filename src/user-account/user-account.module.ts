import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PersonController } from './user-account.controller';
import { UserAccountService } from './user-account.service';

@Module({
  controllers: [PersonController],
  providers: [UserAccountService, PrismaClient],
})
export class PersonModule {}
