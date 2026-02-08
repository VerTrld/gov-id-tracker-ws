import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';

export class CreateGovernmentIdsGroupRequirmentDto extends DefaultEntity {
  @ApiProperty()
  @IsString()
  label: string;

  @ApiPropertyOptional()
  @IsOptional()
  minRequirement?: number;

  @ApiProperty({
    type: () => [String],
    required: true,
  })
  @IsArray()
  requirements: string[];
}
