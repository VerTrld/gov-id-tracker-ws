import { PickType } from '@nestjs/swagger';
import { Requirement } from '../entities/requirement.entity';

export class CreateRequirementDto extends PickType(Requirement, [
  'label',
  'id',
]) {}
