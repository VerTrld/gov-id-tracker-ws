import { PartialType } from '@nestjs/swagger';
import { CreateIdTypeRequirementDto } from './create-id-type-requirement.dto';

export class UpdateIdTypeRequirementDto extends PartialType(CreateIdTypeRequirementDto) {}
