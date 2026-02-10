import { PartialType } from '@nestjs/swagger';
import { CreateRequirementListDto } from './create-requirement-list.dto';

export class UpdateRequirementListDto extends PartialType(CreateRequirementListDto) {}
