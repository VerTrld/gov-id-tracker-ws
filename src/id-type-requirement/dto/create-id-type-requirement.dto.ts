import { PickType } from '@nestjs/mapped-types';
import { IdTypeRequirement } from '../entities/id-type-requirement.entity';

export class CreateIdTypeRequirementDto extends PickType(IdTypeRequirement, [
  'idTypeId',
  'requirementId',
  'isRequired',
]) {}
