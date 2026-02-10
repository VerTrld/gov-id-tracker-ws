import { Injectable } from '@nestjs/common';
import { CreateRequireRequirementListDto } from './dto/create-require-requirement-list.dto';
import { UpdateRequireRequirementListDto } from './dto/update-require-requirement-list.dto';

@Injectable()
export class RequireRequirementListService {
  create(createRequireRequirementListDto: CreateRequireRequirementListDto) {
    return 'This action adds a new requireRequirementList';
  }

  findAll() {
    return `This action returns all requireRequirementList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requireRequirementList`;
  }

  update(id: number, updateRequireRequirementListDto: UpdateRequireRequirementListDto) {
    return `This action updates a #${id} requireRequirementList`;
  }

  remove(id: number) {
    return `This action removes a #${id} requireRequirementList`;
  }
}
