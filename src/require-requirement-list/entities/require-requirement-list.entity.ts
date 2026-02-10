import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { RequirementList } from 'src/requirement-list/entities/requirement-list.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';

export class RequireRequirementList extends DefaultEntity {
  Requirements: Requirement;
  requirementsId: string;
  RequirementList: RequirementList;
  requirementListId: string;
}
