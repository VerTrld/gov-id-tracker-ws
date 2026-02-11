import { PickType } from '@nestjs/swagger';
import { UserGovernmentId } from '../entities/user-government-id.entity';

export class CreateUserGovernmentIdDto extends PickType(UserGovernmentId, [
  'isActive',
  'governmentIdsId',
]) {}
