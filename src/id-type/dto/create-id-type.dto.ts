import { PickType } from '@nestjs/mapped-types';
import { IdType } from '../entities/id-type.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateIdTypeRequirements } from './create-id-type-requirements.dto';

export class CreateIdTypeDto extends PickType(IdType, [
  'code',
  'label',
  'description',
  'officialUrls',
]) {
  @ApiProperty()
  @IsArray()
  requirementIds: CreateIdTypeRequirements[];
}
