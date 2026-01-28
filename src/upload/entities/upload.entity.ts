import { ApiProperty } from '@nestjs/swagger';

export class UploadImage {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file' })
  file: any; 

}
