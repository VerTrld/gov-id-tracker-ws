import { PartialType } from '@nestjs/swagger';
import { CreateRequirementGovernmentIdDto } from './create-requirement-government-id.dto';

export class UpdateRequirementGovernmentIdDto extends PartialType(CreateRequirementGovernmentIdDto) {}
