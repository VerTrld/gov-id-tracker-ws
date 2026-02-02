import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { CreateRequirementGovernmentIdDto } from 'src/requirement-government-ids/dto/create-requirement-government-id.dto';
import { GovernmentId } from '../entities/government-id.entity';

export class CreateGovernmentIdDto extends PickType(GovernmentId, [
  'code',
  'description',
  'label',
  'officialUrls',
]) {}
