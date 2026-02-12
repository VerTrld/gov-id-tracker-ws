import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';
import { UserAccountEntity } from 'src/user-account/entities/user-account.entity';

export class UserRequirement extends DefaultEntity {
  // @ApiPropertyOptional()
  // @IsBoolean()
  isActive?: boolean;

  // @ApiPropertyOptional()
  // @IsString()
  requirementsId?: string;

  Requirement?: Requirement;

  UserAccount?: UserAccountEntity;

  userAccountId?: string;
}
