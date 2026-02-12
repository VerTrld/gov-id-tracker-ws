import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { RequireRequirementListService } from 'src/require-requirement-list/require-requirement-list.service';
import { RequirementList } from 'src/requirement-list/entities/requirement-list.entity';
import { UserRequirement } from 'src/user-requirement/entities/user-requirement.entity';

export class Requirement extends DefaultEntity {
  @ApiProperty()
  @IsString()
  label: string;

  RequirementList: RequirementList[];

  UserRequirements: UserRequirement[];

  RequireRequirementLists: RequireRequirementListService[];
}
