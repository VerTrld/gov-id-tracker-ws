import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';

export class UserAccountEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  roles: UserRoles;
}
