import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Application } from 'src/application/entities/application.entity';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { IdTypeRequirement } from 'src/id-type-requirement/entities/id-type-requirement.entity';

export class IdType extends DefaultEntity {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsArray()
  officialUrls: [];

  @ApiProperty()
  @IsString()
  description: string;

  Requirements: IdTypeRequirement[];

  Applications: Application[];
}
