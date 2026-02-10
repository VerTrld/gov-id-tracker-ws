import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { GovernmentId } from 'src/government-ids/entities/government-id.entity';
import { RequireRequirementList } from 'src/require-requirement-list/entities/require-requirement-list.entity';
import { Requirement } from 'src/requirement/entities/requirement.entity';

export class RequirementList extends DefaultEntity {
  @ApiProperty()
  Requirements: Requirement[];

  @ApiProperty()
  GovernmentIds: GovernmentId;

  @ApiProperty()
  @IsString()
  governmentIdsId: string;

  @ApiProperty()
  RequireRequirementLists: RequireRequirementList[];
}
