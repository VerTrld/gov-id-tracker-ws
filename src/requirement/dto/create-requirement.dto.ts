import { PickType } from '@nestjs/mapped-types';
import { Requirement } from '../entities/requirement.entity';

export class CreateRequirementDto extends PickType(Requirement, [
  'label',
  'description',
]) {}
