import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { UserAccountEntity } from 'src/user-account/entities/user-account.entity';

export class UserRequirement extends DefaultEntity {
  @IsString()
  requirementsId: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  Requirement?: Requirement;

  UserAccount?: UserAccountEntity;

  userAccountId?: string;
}
