import { PartialType } from '@nestjs/swagger';
import { CreateGroupRequireGovernmentIdDto } from './create-group-require-government-id.dto';

export class UpdateGroupRequireGovernmentIdDto extends PartialType(CreateGroupRequireGovernmentIdDto) {}
