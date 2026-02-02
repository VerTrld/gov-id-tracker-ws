import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';

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
}
