import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { UpdateGovernmentIdDto } from './dto/update-government-id.dto';
import { isEAN } from 'class-validator';

@Injectable()
export class GovernmentIdsService {
  constructor(private readonly prismaClient: PrismaClient) {}
  async baseCreate(
    ownerId: string,
    userId: string,
    governmentIdsDto: CreateGovernmentIdDto,
  ) {
    const { ...governmentIdsDtoRes } = governmentIdsDto;
    const createdGovernmentIds = await this.prismaClient.governmentIds.create({
      data: {
        ownerAccountId: ownerId,
        createdBy: userId,
        ...governmentIdsDtoRes,
        RequirementLists: {
          create: {},
        },
      },
    });
  }
  create(
    ownerId: string,
    userId: string,
    createGovernmentIdDto: CreateGovernmentIdDto,
  ) {
    return this.baseCreate(ownerId, userId, createGovernmentIdDto);
  }

  async findAll(ownerId: string, userId: string) {
    const governmentIds = await this.prismaClient.governmentIds.findMany({
      where: { ownerAccountId: ownerId },
    });

    return await Promise.all(
      governmentIds.map(async (gi) => {
        return await this.findOne(ownerId, userId, gi.id);
      }),
    );
  }

  async findOne(ownerId: string, userId: string, governmentId?: string) {
    const governmentIds = await this.prismaClient.governmentIds.findFirst({
      where: {
        id: governmentId,
        ownerAccountId: ownerId,
      },
    });
    return {
      ...governmentIds,
    };
  }

  async baseUpdate(id: string, updateGovernmentIdDto: UpdateGovernmentIdDto) {
    const { ...governmentIdsDtoRes } = updateGovernmentIdDto;
    const updatedGovernmentIds = await this.prismaClient.governmentIds.update({
      where: {
        id,
      },
      data: {
        ...governmentIdsDtoRes,
      },
    });
    return updatedGovernmentIds;
  }

  update(id: string, updateGovernmentIdDto: UpdateGovernmentIdDto) {
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} governmentId`;
  }
}
