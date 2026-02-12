import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';

@Injectable()
export class RequirementService {
  constructor(private readonly prismaService: PrismaClient) {}
  async baseCreate(
    ownerId: string,
    userId: string,
    createRequirementDto: CreateRequirementDto,
  ) {
    const createdRequirement = await this.prismaService.requirements.create({
      data: {
        ownerAccountId: ownerId,
        createdBy: userId,
        ...createRequirementDto,
      },
    });
    return createdRequirement;
  }

  create(
    ownerId: string,
    userId: string,
    createRequirementDto: CreateRequirementDto,
  ) {
    return 'This action adds a new requirement';
  }

  async findAll(ownerId: string, userId: string) {
    const requirements = await this.prismaService.requirements.findMany({
      where: {
        ownerAccountId: ownerId,
      },
    });
    return requirements;
  }

  findOne(id: number) {
    return `This action returns a #${id} requirement`;
  }

  update(id: number, updateRequirementDto: UpdateRequirementDto) {
    return `This action updates a #${id} requirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} requirement`;
  }
}
