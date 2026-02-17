import { Body, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { CreateUserRequirementDto } from './dto/create-user-requirement.dto';
import { UpdateUserRequirementDto } from './dto/update-user-requirement.dto';

@Injectable()
export class UserRequirementService {
  constructor(private readonly prismaService: PrismaClient) {}
  async create(
    userId: string,
    createUserRequirementDto: CreateUserRequirementDto,
  ) {
    const data = await this.prismaService.userRequirement.create({
      data: {
        requirementsId: createUserRequirementDto.requirementsId,
        userAccountId: userId,
        isActive: false,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    return data;
  }

  findAll() {
    return `This action returns all userRequirement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRequirement`;
  }

  async update(id: string) {
    const existing = await this.prismaService.userRequirement.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error('UserRequirement not found');
    }

    return await this.prismaService.userRequirement.update({
      where: { id },
      data: {
        isActive: !existing.isActive,
      },
    });
  }

  // async update(
  //   @OwnerIdParam() ownerId: string,
  //   @UserIdParam() userId: string,
  //   @Body() createUserRequirementDto: any,
  // ) {
  //   const { id, ...resDto } = createUserRequirementDto;
  //   console.log({ createUserRequirementDto });
  //   const findUserReq = await this.prismaService.userRequirement.findFirst({
  //     where: {
  //       ownerAccountId: ownerId,
  //       createdBy: userId,
  //       id: id || '',
  //     },
  //   });

  //   let res;

  //   if (!findUserReq) {
  //     res = await this.prismaService.userRequirement.create({
  //       data: {
  //         userAccountId: userId,
  //         ownerAccountId: ownerId,
  //         createdBy: userId,
  //         ...resDto,
  //         isActive: true,
  //       },
  //     });

  //     return res;

  //     // await this.prismaService.userRequirement.update({
  //     //   where: {
  //     //     ownerAccountId: ownerId,
  //     //     createdBy: userId,
  //     //     id: res.id,
  //     //   },
  //     //   data: {
  //     //     requirementsId: resDto.requirementsId,
  //     //   },
  //     // });
  //   }
  //   res = await this.prismaService.userRequirement.update({
  //     where: {
  //       createdBy: userId,
  //       ownerAccountId: ownerId,
  //       id: id,
  //     },
  //     data: {
  //       isActive: !findUserReq?.isActive,
  //     },
  //   });

  //   return res;
  // }

  patch(@OwnerIdParam() ownerId: string) {
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} userRequirement`;
  }
}
