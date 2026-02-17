import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';

export class UserRequirementDto extends DefaultEntity {
  @IsUUID()
  requirementsId: string;

  @IsOptional()
  @IsUUID()
  userRequirementId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
