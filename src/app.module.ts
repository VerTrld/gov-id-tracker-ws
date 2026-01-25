import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './enum/common/guards/roles.guard';

@Module({
  imports: [AuthModule, PersonModule],
  // controllers: [AppController],
  providers: [APP_GUARD],
  useClass: RolesGuard,
})
export class AppModule {}
