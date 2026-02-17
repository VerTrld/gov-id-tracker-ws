import { Module } from '@nestjs/common';
import { IdTypeRequirementsService } from './id-type-requirement.service';
import { IdTypeRequirementsController } from './id-type-requirement.controller';

@Module({
  controllers: [IdTypeRequirementsController],
  providers: [IdTypeRequirementsService],
})
export class IdTypeRequirementModule {}
