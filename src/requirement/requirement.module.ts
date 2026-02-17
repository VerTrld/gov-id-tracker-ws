import { Module } from '@nestjs/common';
import { RequirementsService } from './requirement.service';
import { RequirementsController } from './requirement.controller';

@Module({
  controllers: [RequirementsController],
  providers: [RequirementsService],
})
export class RequirementModule {}
