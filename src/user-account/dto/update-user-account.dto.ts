import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserAccountEntity } from '../entities/user-account.entity';
import { IsString } from 'class-validator';

export class UpdateUserAccountDto extends PickType(UserAccountEntity, [
  'name',
  'email',
]) {
  @ApiProperty()
  @IsString()
  currentPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
