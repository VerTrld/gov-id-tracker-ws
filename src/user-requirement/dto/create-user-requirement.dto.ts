import { PickType } from '@nestjs/swagger';
import { UserRequirement } from '../entities/user-requirement.entity';

export class CreateUserRequirementDto extends PickType(UserRequirement, [
  'requirementsId',
  'isActive',
  'id',
]) {}
