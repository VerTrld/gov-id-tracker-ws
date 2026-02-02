import { Injectable } from '@nestjs/common';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { UpdateGovernmentIdDto } from './dto/update-government-id.dto';
import { PrismaClient } from '@prisma/client';
import * as _ from 'lodash';

@Injectable()
export class GovernmentIdsService {
  constructor(private readonly prismaClient: PrismaClient) {}
  async baseCreate(governmentIdsDto: CreateGovernmentIdDto) {
    const { ...governmentIdsDtoRes } = governmentIdsDto;
    const createdGovernmentIds = await this.prismaClient.govermentIds.create({
      data: {
        ...governmentIdsDtoRes,
      },
    });
    return createdGovernmentIds;
  }
  create(createGovernmentIdDto: CreateGovernmentIdDto) {
    return this.baseCreate(createGovernmentIdDto);
  }

  findAll() {
    return `This action returns all governmentIds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} governmentId`;
  }

  async baseUpdate(id: string, updateGovernmentIdDto: UpdateGovernmentIdDto) {
    const { ...governmentIdsDtoRes } = updateGovernmentIdDto;
    const updatedGovernmentIds = await this.prismaClient.govermentIds.update({
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
