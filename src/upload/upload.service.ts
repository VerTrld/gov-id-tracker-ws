import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { supabase } from 'src/lib/supabase';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaClient) {}

  public async create(file: any, userRequirementId: string): Promise<string> {
    if (!file) throw new BadRequestException('No image provided');

    const fileName = `${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from('gov-id-tracker')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw new BadRequestException(error.message);

    const { data } = supabase.storage
      .from('gov-id-tracker')
      .getPublicUrl(fileName);

    if (!data?.publicUrl)
      throw new BadRequestException('Failed to get public URL');

    const fileUrl = data.publicUrl;

    await this.prismaService.requirementUpload.create({
      data: {
        fileUrl,
        fileName,
        fileType: file.mimetype,
        userRequirementId,
      },
    });

    return fileUrl;
  }

  async viewRequirement(userId: string, requirementId: string) {
    // Get UserRequirement for this user + requirement
    const userReq = await this.prismaService.userRequirement.findFirst({
      where: { userId: userId, id: requirementId },
    });

    console.log(userReq);

    if (!userReq) return []; // no uploads yet

    return this.prismaService.requirementUpload.findMany({
      where: { userRequirementId: userReq.id },
    });
  }
}
