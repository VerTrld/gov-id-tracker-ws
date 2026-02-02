import { Injectable } from '@nestjs/common';
import { CreateRequirementGovernmentIdDto } from './dto/create-requirement-government-id.dto';
import { UpdateRequirementGovernmentIdDto } from './dto/update-requirement-government-id.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RequirementGovernmentIdsService {
  constructor(private readonly prismaClient: PrismaClient) {}
  async baseCreate(
    createRequirementGovernmentIdDto: CreateRequirementGovernmentIdDto,
  ) {
    const createdReqGovIds =
      await this.prismaClient.requirementGovernmentIds.create({
        data: {
          ...createRequirementGovernmentIdDto,
        },
      });
    return createdReqGovIds;
  }
  create(createRequirementGovernmentIdDto: CreateRequirementGovernmentIdDto) {
    return 'This action adds a new requirementGovernmentId';
  }

  findAll() {
    return `This action returns all requirementGovernmentIds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requirementGovernmentId`;
  }

  update(
    id: number,
    updateRequirementGovernmentIdDto: UpdateRequirementGovernmentIdDto,
  ) {
    return `This action updates a #${id} requirementGovernmentId`;
  }

  remove(id: number) {
    return `This action removes a #${id} requirementGovernmentId`;
  }
}
