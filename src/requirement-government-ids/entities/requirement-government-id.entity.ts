import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { GroupRequireGovernmentId } from 'src/group-require-government-ids/entities/group-require-government-id.entity';

export class RequirementGovernmentId extends DefaultEntity {
  @ApiProperty()
  @IsString()
  governmentId: string;

  @ApiProperty()
  @IsString()
  requireGovernmentId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  groupRequireGovernmentId?: string;

  GroupRequireGovernmentIds?: GroupRequireGovernmentId;
}
