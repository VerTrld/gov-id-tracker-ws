import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { GovernmentId } from '../entities/government-id.entity';
import { CreateGovernmentIdsGroupRequirmentDto } from './create-government-ids-group-requirements.dto';

export class CreateGovernmentIdDto extends PickType(GovernmentId, [
  'code',
  'description',
  'label',
  'officialUrls',
]) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGovernmentIdsGroupRequirmentDto)
  @ApiProperty({
    type: () => [CreateGovernmentIdsGroupRequirmentDto],
    required: true,
  })
  GroupRequirementGovernmentIds: CreateGovernmentIdsGroupRequirmentDto[];
}
