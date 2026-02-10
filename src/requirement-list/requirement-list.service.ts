import { Injectable } from '@nestjs/common';
import { CreateRequirementListDto } from './dto/create-requirement-list.dto';
import { UpdateRequirementListDto } from './dto/update-requirement-list.dto';

@Injectable()
export class RequirementListService {
  create(createRequirementListDto: CreateRequirementListDto) {
    return 'This action adds a new requirementList';
  }

  findAll() {
    return `This action returns all requirementList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requirementList`;
  }

  update(id: number, updateRequirementListDto: UpdateRequirementListDto) {
    return `This action updates a #${id} requirementList`;
  }

  remove(id: number) {
    return `This action removes a #${id} requirementList`;
  }
}
