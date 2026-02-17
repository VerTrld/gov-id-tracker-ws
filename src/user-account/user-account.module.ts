import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserAccountService } from './user-account.service';
import { UserAccountController } from './user-account.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserAccountController],
  providers: [UserAccountService],
})
export class UserAccountModule {}
