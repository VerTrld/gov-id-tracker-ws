import { Module } from '@nestjs/common';
import { UploadModule } from 'src/upload/upload.module';
import { IdTypesController } from './id-type.controller';
import { IdTypesService } from './id-type.service';

@Module({
  controllers: [IdTypesController],
  providers: [IdTypesService],
  imports: [UploadModule],
})
export class IdTypeModule {}
