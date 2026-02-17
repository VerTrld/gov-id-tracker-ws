import { PartialType, PickType } from '@nestjs/swagger';
import { UserRequirementDto } from '../entities/user-update.entity';

export class UpdateUserRequirementDto extends PickType(UserRequirementDto, [
  'requirementsId',
  'userRequirementId',
  'isActive',
]) {}
