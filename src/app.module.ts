import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PersonModule } from './user-account/user-account.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, PersonModule, UploadModule],
  // controllers: [AppController],
  // providers: [APP_GUARD],
  // useClass: RolesGuard,
})
export class AppModule {}
