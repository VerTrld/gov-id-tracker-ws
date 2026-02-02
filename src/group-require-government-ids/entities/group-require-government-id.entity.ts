import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';

export class GroupRequireGovernmentId extends DefaultEntity {
  @ApiPropertyOptional()
  @IsOptional()
  minRequirement?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  label?: string;
}
