import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { IdType } from 'src/id-type/entities/id-type.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';

export class IdTypeRequirement extends DefaultEntity {
  idTypeId: string;
  requirementId: string;
  isRequired: boolean;

  IdType: IdType;
  Requirement: Requirement;
}
