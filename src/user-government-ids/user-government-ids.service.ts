import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserGovernmentIdDto } from './dto/create-user-government-id.dto';
import { UpdateUserGovernmentIdDto } from './dto/update-user-government-id.dto';

@Injectable()
export class UserGovernmentIdsService {
  constructor(private readonly prismaService: PrismaClient) {}
  async create(
    ownerId: string,
    userId: string,
    createUserGovernmentIdDto: CreateUserGovernmentIdDto,
  ) {
    const createdUserGovernment =
      await this.prismaService.userGovernmentIds.create({
        data: {
          ownerAccountId: ownerId,
          createdBy: userId,
          userAccountId: userId,
          ...createUserGovernmentIdDto,
        },
      });
    return createdUserGovernment;
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
