import { Injectable } from '@nestjs/common';
import { CreateUserGovernmentIdDto } from './dto/create-user-government-id.dto';
import { UpdateUserGovernmentIdDto } from './dto/update-user-government-id.dto';

@Injectable()
export class UserGovernmentIdsService {
  create(createUserGovernmentIdDto: CreateUserGovernmentIdDto) {
    return 'This action adds a new userGovernmentId';
  }

  findAll() {
    return `This action returns all userGovernmentIds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGovernmentId`;
  }

  update(id: number, updateUserGovernmentIdDto: UpdateUserGovernmentIdDto) {
    return `This action updates a #${id} userGovernmentId`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGovernmentId`;
  }
}
