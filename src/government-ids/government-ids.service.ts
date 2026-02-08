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
    const { GroupRequirementGovernmentIds, ...governmentIdsDtoRes } =
      governmentIdsDto;
    const createdGovernmentIds = await this.prismaClient.governmentIds.create({
      data: {
        ownerAccountId: ownerId,
        createdBy: userId,
        ...governmentIdsDtoRes,
      },
    });

    const createdGroupRequirements = await Promise.all(
      GroupRequirementGovernmentIds.map(async (grgi) => {
        const { requirements, ...res } = grgi;
        const createdGroup =
          await this.prismaClient.groupRequireGovernmentIds.create({
            data: {
              ownerAccountId: ownerId,
              createdBy: userId,
              ...res,
            },
          });

        const requirementsGovernmentIds = requirements.map((r) => {
          return {
            governmentId: createdGovernmentIds.id,
            groupRequireGovernmentId: createdGroup.id,
            requireGovernmentId: r,
            ownerAccountId: ownerId,
            createdBy: userId,
          };
        });
        const createdRequirementsGovernmentIds =
          await this.prismaClient.requirementGovernmentIds.createMany({
            data: requirementsGovernmentIds,
          });
      }),
    );
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
      include: {
        RequirementGovernmentIds: true,
        RequireGovernmentIds: true,
        UserGovernmentIds: true,
      },
    });

    console.log({ governmentIds });

    const groupRequireGovernmentIds =
      await this.prismaClient.groupRequireGovernmentIds.findMany({
        where: {
          id: {
            in: governmentIds?.RequirementGovernmentIds.map(
              (rgi) => rgi.groupRequireGovernmentId || '',
            ),
          },
        },
      });

    const structuredGroup = await Promise.all(
      groupRequireGovernmentIds.map(async (grgi) => {
        const requireGovernmentIds =
          await this.prismaClient.requirementGovernmentIds.findMany({
            where: {
              groupRequireGovernmentId: grgi.id,
            },
            include: {
              RequireGovernmentIds: true,
            },
          });

        const requireGovernmentIdsWithUserIds = await Promise.all(
          requireGovernmentIds.map(async (rgi) => {
            const userGovernmentIds =
              await this.prismaClient.userGovernmentIds.findFirst({
                where: {
                  createdBy: userId,
                },
              });
            return {
              ...rgi,
              UserGovernmentIds: userGovernmentIds,
            };
          }),
        );

        return {
          require: requireGovernmentIdsWithUserIds,
          ...grgi,
        };
      }),
    );

    return {
      ...governmentIds,
      requirements: structuredGroup,
    };
  }

  async baseUpdate(id: string, updateGovernmentIdDto: UpdateGovernmentIdDto) {
    const { GroupRequirementGovernmentIds, ...governmentIdsDtoRes } =
      updateGovernmentIdDto;
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
