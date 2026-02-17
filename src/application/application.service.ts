import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaClient) {}

  // 1️⃣ Apply for ID
  async apply(ownerId: string, userId: string, idTypeId: string) {
    // prevent duplicate application
    const existing = await this.prisma.application.findFirst({
      where: { userId, idTypeId, ownerAccountId: ownerId },
    });

    if (existing) return existing;

    return this.prisma.application.create({
      data: {
        ownerAccountId: ownerId,
        userId,
        createdBy: userId,
        idTypeId,
      },
    });
  }

  // 2️⃣ Get Application + Auto-Checked Requirements + Progress
  async getApplication(userId: string, applicationId: string) {
    const application = await this.prisma.application.findFirst({
      where: {
        id: applicationId,
        userId,
      },
      include: {
        idType: {
          include: {
            requirements: {
              include: {
                requirement: {
                  include: {
                    userRequirements: {
                      where: {
                        userId,
                        isCompleted: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!application) throw new NotFoundException();

    const requirements = application.idType.requirements.map((r) => {
      const isCompleted = r.requirement.userRequirements.length > 0;

      return {
        id: r.requirement.id,
        label: r.requirement.label,
        isRequired: r.isRequired,
        isCompleted,
      };
    });

    const total = requirements.length;
    const completed = requirements.filter((r) => r.isCompleted).length;
    const progress = total === 0 ? 0 : (completed / total) * 100;

    return {
      applicationId: application.id,
      idType: application.idType.label,
      status: application.status,
      progress,
      requirements,
    };
  }

  async completeRequirement(
    userId: string,
    requirementId: string,
    fileUrl?: string,
  ) {
    return this.prisma.userRequirement.upsert({
      where: {
        userId_requirementId: {
          userId,
          requirementId,
        },
      },
      update: {
        isCompleted: true,
        fileUrl,
        completedAt: new Date(),
      },
      create: {
        userId,
        requirementId,
        isCompleted: true,
        fileUrl,
        completedAt: new Date(),
      },
    });
  }
}
