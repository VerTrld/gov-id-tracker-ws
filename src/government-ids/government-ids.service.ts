import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { UpdateGovernmentIdDto } from './dto/update-government-id.dto';

@Injectable()
export class GovernmentIdsService {
  constructor(private readonly prismaClient: PrismaClient) {}
  async baseCreate(governmentIdsDto: CreateGovernmentIdDto) {
    const { GroupRequirementGovernmentIds, ...governmentIdsDtoRes } =
      governmentIdsDto;
    const createdGovernmentIds = await this.prismaClient.govermentIds.create({
      data: {
        ...governmentIdsDtoRes,
      },
    });

    const createdGroupRequirements = await Promise.all(
      GroupRequirementGovernmentIds.map(async (grgi) => {
        const { requirements, ...res } = grgi;
        const createdGroup =
          await this.prismaClient.groupRequireGovernmentIds.create({
            data: {
              ...res,
            },
          });

        const requirementsGovernmentIds = requirements.map((r) => {
          return {
            governmentId: createdGovernmentIds.id,
            groupRequireGovernmentId: createdGroup.id,
            requireGovernmentId: r,
          };
        });
        const createdRequirementsGovernmentIds =
          await this.prismaClient.requirementGovernmentIds.createMany({
            data: requirementsGovernmentIds,
          });
      }),
    );
  }
  create(createGovernmentIdDto: CreateGovernmentIdDto) {
    return this.baseCreate(createGovernmentIdDto);
  }

  async findAll() {
    const governmentIds = await this.prismaClient.govermentIds.findMany({
      include: {
        RequirementGovernmentIds: true,
        RequireGovermentIds: true,
        UserGovernmentIds: true,
      },
    });

    const structuredGovernmentIds = await Promise.all(
      governmentIds.map(async (gi) => {
        const uniq = _.uniq(
          gi.RequirementGovernmentIds.map(
            (rgi) => rgi.groupRequireGovernmentId,
          ),
        );
        const uniqGroup =
          await this.prismaClient.groupRequireGovernmentIds.findMany({
            where: {
              id: {
                in: uniq,
              },
            },
          });

        console.log({ structuredGovernmentIds });
        return {};
      }),
    );
    return governmentIds;
  }

  findOne(id: number) {
    return `This action returns a #${id} governmentId`;
  }

  async baseUpdate(id: string, updateGovernmentIdDto: UpdateGovernmentIdDto) {
    const { GroupRequirementGovernmentIds, ...governmentIdsDtoRes } =
      updateGovernmentIdDto;
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
