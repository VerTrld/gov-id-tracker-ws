import { Injectable } from '@nestjs/common';
import { CreateUserGovernmentIdDto } from './dto/create-user-government-id.dto';
import { UpdateUserGovernmentIdDto } from './dto/update-user-government-id.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserGovernmentIdsService {
  constructor(private readonly prismaClient: PrismaClient) {}
  create(createUserGovernmentIdDto: CreateUserGovernmentIdDto) {
    return 'This action adds a new userGovernmentId';
  }

  findAll() {
    return `This action returns all userGovernmentIds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGovernmentId`;
  }

  async updateToggle(
    ownerId: string,
    userId: string,
    userGovernmentId: string,
  ) {
    const currentUserGovernment =
      await this.prismaClient.userGovernmentIds.findUnique({
        where: {
          id: userGovernmentId,
          ownerAccountId: ownerId,
          createdBy: userId,
        },
      });

    const updatedUserGovernmentId =
      await this.prismaClient.userGovernmentIds.update({
        where: {
          id: userGovernmentId,
        },
        data: {
          isActive: !currentUserGovernment?.isActive,
        },
      });
    return updatedUserGovernmentId;
  }

  remove(id: number) {
    return `This action removes a #${id} userGovernmentId`;
  }
}
