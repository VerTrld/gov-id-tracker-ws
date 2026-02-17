import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateIdTypeRequirementDto } from './dto/create-id-type-requirement.dto';

@Injectable()
export class IdTypeRequirementsService {
  constructor(private prisma: PrismaClient) {}

  // 1️⃣ Attach Requirement to ID Type
  async create(createIdTypeRequirementDto: CreateIdTypeRequirementDto) {
    try {
      return await this.prisma.idTypeRequirement.create({
        data: {
          idTypeId: createIdTypeRequirementDto.idTypeId,
          requirementId: createIdTypeRequirementDto.requirementId,
          isRequired: createIdTypeRequirementDto.isRequired ?? true,
        },
      });
    } catch (error) {
      throw new ConflictException(
        'Requirement already assigned to this ID type',
      );
    }
  }

  // 2️⃣ Update Required Flag
  async update(id: string, isRequired: boolean) {
    const record = await this.prisma.idTypeRequirement.findUnique({
      where: { id },
    });

    if (!record) throw new NotFoundException();

    return this.prisma.idTypeRequirement.update({
      where: { id },
      data: { isRequired },
    });
  }

  // 3️⃣ Remove Requirement from ID Type
  async remove(id: string) {
    const record = await this.prisma.idTypeRequirement.findUnique({
      where: { id },
    });

    if (!record) throw new NotFoundException();

    return this.prisma.idTypeRequirement.delete({
      where: { id },
    });
  }
}
