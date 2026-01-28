import { Injectable } from '@nestjs/common';
import { PrismaClient, UserAccount } from '@prisma/client';
import * as argon2 from 'argon2';
import { UserRole } from 'src/enum/common/enums/user-role.enum';
import { CreateUserAccountDto } from './dto/create-user-account.dto';

@Injectable()
export class UserAccountService {
  constructor(private prismaClient: PrismaClient) {}

  async hashPassword(password: string) {
    const hashPassword = await argon2.hash(password);
    return hashPassword;
  }

  async createFirstUser(
    createUserAccountDto: CreateUserAccountDto,
  ): Promise<UserAccount> {
    const createdFirstUser = await this.create({
      ...createUserAccountDto,
      roles: UserRole.SUPER_ADMIN,
    });
    return createdFirstUser;
  }

  async create(
    createUserAccountDto: CreateUserAccountDto,
  ): Promise<UserAccount> {
    const { password, ...res } = createUserAccountDto;
    const createdHashPassword = await this.hashPassword(password);
    const createdUserAccount = await this.prismaClient.userAccount.create({
      data: {
        ...res,
        password: createdHashPassword,
      },
    });

    return createdUserAccount;
  }

  async remove(id: string) {
    const deletePerson = await this.prismaClient.userAccount.delete({
      where: { id },
    });
    return deletePerson;
  }
}
