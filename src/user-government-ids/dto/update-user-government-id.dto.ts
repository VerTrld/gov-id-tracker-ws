import { PartialType } from '@nestjs/swagger';
import { CreateUserGovernmentIdDto } from './create-user-government-id.dto';

export class UpdateUserGovernmentIdDto extends PartialType(CreateUserGovernmentIdDto) {}
