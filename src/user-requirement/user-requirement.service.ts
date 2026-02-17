import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRequirementsService {
  constructor(private prisma: PrismaClient) {}

  // 1️⃣ Get all completed requirements of user
  async findByUser(ownerId: string, userId: string) {
    return this.prisma.userRequirement.findMany({
      where: { userId, ownerAccountId: ownerId },
      include: {
        requirement: true,
      },
      orderBy: { completedAt: 'desc' },
    });
  }

  // 2️⃣ Complete or Upload Requirement
  async complete(
    ownerId: string,
    userId: string,
    requirementId: string,
    fileUrl?: string,
    expiresAt?: Date,
  ) {
    const userRequirement = await this.prisma.userRequirement.findFirst({
      where: {
        requirementId,
        userId: userId,
      },
    });
    return this.prisma.userRequirement.upsert({
      where: {
        ownerAccountId: ownerId,
        userId_requirementId: {
          userId,
          requirementId,
        },
      },
      update: {
        ownerAccountId: ownerId,
        isCompleted: !userRequirement?.isCompleted,
        updatedBy: userId,
        fileUrl,
        expiresAt,
        completedAt: new Date(),
      },
      create: {
        ownerAccountId: ownerId,
        userId,
        requirementId,
        isCompleted: true,
        fileUrl,
        expiresAt,
        completedAt: new Date(),
      },
    });
  }

  // 3️⃣ Admin Verification
  async verify(id: string) {
    const record = await this.prisma.userRequirement.findUnique({
      where: { id },
    });

    if (!record) throw new NotFoundException();

    return this.prisma.userRequirement.update({
      where: { id },
      data: {
        verified: true,
      },
    });
  }
}
