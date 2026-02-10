import { PartialType } from '@nestjs/swagger';
import { CreateRequireRequirementListDto } from './create-require-requirement-list.dto';

export class UpdateRequireRequirementListDto extends PartialType(CreateRequireRequirementListDto) {}
