import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateIdTypeDto } from './dto/create-id-type.dto';

@Injectable()
export class IdTypesService {
  constructor(private prisma: PrismaClient) {}

  // 1️⃣ Create ID Type + Attach Requirements
  async create(createIdTypeDto: CreateIdTypeDto) {
    const { requirementIds, ...resDto } = createIdTypeDto;
    const idType = await this.prisma.idType.create({
      data: {
        ...resDto,
      },
    });

    const toConnect = requirementIds.filter((ri) => ri.id);
    const toCreate = requirementIds.filter((ri) => !ri.id);

    if (requirementIds?.length) {
      if (toConnect.length) {
        await this.prisma.idTypeRequirement.createMany({
          data: toConnect.map((ri) => ({
            idTypeId: idType.id,
            requirementId: ri.id,
          })),
        });
      }

      console.log({ toConnect, toCreate });
      if (toCreate.length) {
        const createdRequirements =
          await this.prisma.requirement.createManyAndReturn({
            data: toCreate.map((ri) => {
              const { id, ...resCreateDto } = ri;
              return {
                ...resCreateDto,
              };
            }),
          });

        if (createdRequirements) {
          await this.prisma.idTypeRequirement.createMany({
            data: createdRequirements.map((ri) => ({
              idTypeId: idType.id,
              requirementId: ri.id,
            })),
          });
        }
      }
    }

    return idType;
  }

  // 2️⃣ Get All ID Types
  async findAll(ownerId: string, userId: string) {
    return this.prisma.idType.findMany({
      include: {
        applications: {
          where: {
            userId,
          },
        },
        requirements: {
          include: {
            requirement: {
              include: {
                userRequirements: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // 3️⃣ Get Single ID Type + Requirements
  async findOne(ownerId: string, userId: string, idTypeCode: string) {
    const idType = await this.prisma.idType.findUnique({
      where: { code: idTypeCode },
      include: {
        applications: {
          where: {
            userId,
          },
        },
        requirements: {
          include: {
            requirement: {
              include: {
                userRequirements: {
                  where: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log({ idType, userId });

    if (!idType) throw new NotFoundException();

    return idType;
  }

  // 4️⃣ Delete ID Type
  async remove(id: string) {
    return this.prisma.idType.delete({
      where: { id },
    });
  }
}
