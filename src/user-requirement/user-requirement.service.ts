import { Injectable } from '@nestjs/common';
import { CreateUserRequirementDto } from './dto/create-user-requirement.dto';
import { UpdateUserRequirementDto } from './dto/update-user-requirement.dto';

@Injectable()
export class UserRequirementService {
  create(createUserRequirementDto: CreateUserRequirementDto) {
    return 'This action adds a new userRequirement';
  }

  findAll() {
    return `This action returns all userRequirement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRequirement`;
  }

  update(id: number, updateUserRequirementDto: UpdateUserRequirementDto) {
    return `This action updates a #${id} userRequirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRequirement`;
  }
}
