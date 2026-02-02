import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { RequirementGovernmentId } from '../entities/requirement-government-id.entity';

export class CreateRequirementGovernmentIdDto extends PickType(
  RequirementGovernmentId,
  ['governmentId', 'groupRequireGovernmentId', 'requireGovernmentId'],
) {}
