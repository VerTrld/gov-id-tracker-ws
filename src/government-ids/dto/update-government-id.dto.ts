import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGovernmentIdDto } from './create-government-id.dto';

export class UpdateGovernmentIdDto extends PartialType(CreateGovernmentIdDto) {
}
