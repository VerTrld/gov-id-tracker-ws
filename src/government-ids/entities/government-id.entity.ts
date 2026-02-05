import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { RequirementGovernmentId } from 'src/requirement-government-ids/entities/requirement-government-id.entity';

export class GovernmentId extends DefaultEntity {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  label: string;

  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsArray()
  officialUrls: string[];

  @ApiProperty()
  RequirementGovernmentIds?: RequirementGovernmentId[];

  @ApiProperty()
  RequireGovermentIds?: RequirementGovernmentId[];
}
