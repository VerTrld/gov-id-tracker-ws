import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { GovernmentId } from '../entities/government-id.entity';
import { RequirementList } from 'src/requirement-list/entities/requirement-list.entity';

export class CreateGovernmentIdDto extends PickType(GovernmentId, [
  'code',
  'description',
  'label',
  'officialUrls',
]) {
  RequirementList: RequirementList[];
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateGovernmentIdsGroupRequirmentDto)
  // @ApiProperty({
  //   type: () => [CreateGovernmentIdsGroupRequirmentDto],
  //   required: true,
  // })
  // GroupRequirementGovernmentIds: CreateGovernmentIdsGroupRequirmentDto[];
}
