import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PersonModule } from './user-account/user-account.module';

@Module({
  imports: [AuthModule, PersonModule],
  // controllers: [AppController],
})
export class AppModule {}
