import { PickType } from '@nestjs/swagger';
import { UserAccountEntity } from '../entities/user-account.entity';

export class CreateFirstUserAccountDto extends PickType(UserAccountEntity, [
  'name',
  'email',
  'password',
]) {}

export class CreateUserAccountDto extends PickType(UserAccountEntity, [
  'name',
  'email',
  'password',
  'roles',
]) {}
