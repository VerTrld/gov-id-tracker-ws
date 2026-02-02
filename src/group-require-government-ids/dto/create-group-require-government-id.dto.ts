import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { GroupRequireGovernmentId } from '../entities/group-require-government-id.entity';

export class CreateGroupRequireGovernmentIdDto extends PickType(
  GroupRequireGovernmentId,
  ['minRequirement', 'label'],
) {}
