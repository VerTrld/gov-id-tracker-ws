import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { UserRole } from 'src/enum/common/enums/user-role.enum';

export class UserAccountEntity extends DefaultEntity {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiPropertyOptional()
  @IsString()
  @IsEnum(UserRole)
  roles?: string;
}
