import { PartialType } from '@nestjs/swagger';
import { CreateUserRequirementDto } from './create-user-requirement.dto';

export class UpdateUserRequirementDto extends PartialType(CreateUserRequirementDto) {}
