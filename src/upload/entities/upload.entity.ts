import { ApiProperty } from '@nestjs/swagger';

export class UploadImageEntity {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file' })
  file: any;
}
