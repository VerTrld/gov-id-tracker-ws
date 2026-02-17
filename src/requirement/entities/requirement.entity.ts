import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { IdTypeRequirement } from 'src/id-type-requirement/entities/id-type-requirement.entity';
import { UserRequirement } from 'src/user-requirement/entities/user-requirement.entity';

export class Requirement extends DefaultEntity {
  label: string;
  description: string;
  IdTypes: IdTypeRequirement[];
  UserRequirements: UserRequirement[];
}
