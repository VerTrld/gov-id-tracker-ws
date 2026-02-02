import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsObject, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { CreateRequirementGovernmentIdDto } from 'src/requirement-government-ids/dto/create-requirement-government-id.dto';

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
}
