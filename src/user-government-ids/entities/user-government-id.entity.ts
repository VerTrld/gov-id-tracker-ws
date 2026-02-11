import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { GovernmentId } from 'src/government-ids/entities/government-id.entity';

export class UserGovernmentId extends DefaultEntity {
  @ApiPropertyOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsString()
  governmentIdsId: string;

  @ApiProperty()
  @IsString()
  userAccountId: string;

  @ApiProperty()
  GovernmentIds: GovernmentId;
}
