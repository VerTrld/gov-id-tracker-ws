import { ApiPropertyOptional } from '@nestjs/swagger';

export class DefaultEntity {
  @ApiPropertyOptional()
  id?: string;
  @ApiPropertyOptional()
  ownerAccountId?: string;
  @ApiPropertyOptional()
  createdAt?: string;
  @ApiPropertyOptional()
  createdBy?: string;
  @ApiPropertyOptional()
  updatedAt?: string;
  @ApiPropertyOptional()
  updatedBy?: string;
}
