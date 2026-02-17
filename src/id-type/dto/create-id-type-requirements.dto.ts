import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Requirement } from 'src/requirement/entities/requirement.entity';

export class CreateIdTypeRequirements extends PickType(Requirement, [
  'label',
  'description',
]) {
  @ApiProperty()
  @IsString()
  id: string;
}
