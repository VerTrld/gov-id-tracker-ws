import { PickType } from '@nestjs/swagger';
import { UploadImageEntity } from '../entities/upload.entity';

export class UploadImageDto extends PickType(UploadImageEntity, ['file']) {}
