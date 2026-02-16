import { PickType } from '@nestjs/swagger';
import { UserAccountEntity } from '../entities/user-account.entity';

export class UpdateUserAccountDto extends PickType(UserAccountEntity, [
  'name',
  'email',
  'password',
]) {}
