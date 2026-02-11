import { PickType } from '@nestjs/swagger';
import { GovernmentId } from '../entities/government-id.entity';

export class CreateGovernmentIdDto extends PickType(GovernmentId, [
  'code',
  'description',
  'label',
  'officialUrls',
]) {}
