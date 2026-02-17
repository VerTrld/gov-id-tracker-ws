import { Module } from '@nestjs/common';
import { IdTypesService } from './id-type.service';
import { IdTypesController } from './id-type.controller';

@Module({
  controllers: [IdTypesController],
  providers: [IdTypesService],
})
export class IdTypeModule {}
