import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateRequirementDto } from 'src/requirement/dto/create-requirement.dto';
import { GovernmentId } from '../entities/government-id.entity';

export class CreateGovernmentIdDto extends PickType(GovernmentId, [
  'code',
  'description',
  'label',
  'officialUrls',
  'id',
]) {
  @ApiProperty({ type: [CreateRequirementDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequirementDto)
  Requirements: CreateRequirementDto[];
}
