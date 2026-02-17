import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRequirementDto } from './dto/create-requirement.dto';

@Injectable()
export class RequirementsService {
  constructor(private prisma: PrismaClient) {}

  // 1️⃣ Create Requirement
  async create(createRequirementDto: CreateRequirementDto) {
    try {
      return await this.prisma.requirement.create({
        data: {
          ...createRequirementDto,
        },
      });
    } catch (error) {
      throw new ConflictException('Requirement already exists');
    }
  }

  // 2️⃣ Get All Requirements
  async findAll() {
    return this.prisma.requirement.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3️⃣ Get One Requirement
  async findOne(id: string) {
    const requirement = await this.prisma.requirement.findUnique({
      where: { id },
      include: {
        idTypes: {
          include: {
            idType: true,
          },
        },
      },
    });

    if (!requirement) throw new NotFoundException();

    return requirement;
  }

  // 4️⃣ Update Requirement
  async update(id: string, data: { name?: string; description?: string }) {
    const exists = await this.prisma.requirement.findUnique({
      where: { id },
    });

    if (!exists) throw new NotFoundException();

    return this.prisma.requirement.update({
      where: { id },
      data,
    });
  }

  // 5️⃣ Delete Requirement
  async remove(id: string) {
    const exists = await this.prisma.requirement.findUnique({
      where: { id },
    });

    if (!exists) throw new NotFoundException();

    return this.prisma.requirement.delete({
      where: { id },
    });
  }
}
