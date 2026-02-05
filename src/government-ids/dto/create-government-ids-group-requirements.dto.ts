import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGovernmentIdsGroupRequirmentDto {
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
