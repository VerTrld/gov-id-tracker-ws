import { Injectable } from '@nestjs/common';
import { CreateGroupRequireGovernmentIdDto } from './dto/create-group-require-government-id.dto';
import { UpdateGroupRequireGovernmentIdDto } from './dto/update-group-require-government-id.dto';
import { PrismaClient } from '@prisma/client';
import { CreateRequirementGovernmentIdDto } from 'src/requirement-government-ids/dto/create-requirement-government-id.dto';

@Injectable()
export class GroupRequireGovernmentIdsService {
  constructor(private readonly prismaClient: PrismaClient) {}
  async baseCreate(
    createGroupRequireGovernmentIdDto: CreateGroupRequireGovernmentIdDto,
  ) {
    const createdGroupRequireGovIds =
      await this.prismaClient.groupRequireGovernmentIds.create({
        data: {
          ...createGroupRequireGovernmentIdDto,
        },
      });

    return createdGroupRequireGovIds;
  }
  create(createGroupRequireGovernmentIdDto: CreateGroupRequireGovernmentIdDto) {
    return 'This action adds a new groupRequireGovernmentId';
  }

  findAll() {
    return `This action returns all groupRequireGovernmentIds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupRequireGovernmentId`;
  }

  update(
    id: number,
    updateGroupRequireGovernmentIdDto: UpdateGroupRequireGovernmentIdDto,
  ) {
    return `This action updates a #${id} groupRequireGovernmentId`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupRequireGovernmentId`;
  }
}
