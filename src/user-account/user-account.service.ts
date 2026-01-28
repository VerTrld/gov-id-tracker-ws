import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import * as _ from 'lodash';
import { UserRole } from 'src/enum/common/enums/user-role.enum';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateFirstUserAccountDto,
  CreateUserAccountDto,
} from './dto/create-user-account.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UserAccountService {
  constructor(private prismaClient: PrismaClient) {}

  async hashPassword(password: string) {
    const hashPassword = await argon2.hash(password);
    return hashPassword;
  }

  async createFirstUser(createUserAccountDto: CreateFirstUserAccountDto) {
    const createdFirstUser = await this.create({
      ...createUserAccountDto,
      roles: UserRole.SUPER_ADMIN,
    });
    return createdFirstUser;
  }

  async create(createUserAccountDto: CreateUserAccountDto) {
    const { password, ...res } = createUserAccountDto;
    const admin = await this.prismaClient.userAccount.findFirst({
      where: {
        roles: UserRole.SUPER_ADMIN,
      },
    });
    const idv4 = uuidv4();
    const id = idv4;

    const createdHashPassword = await this.hashPassword(password);
    console.log({ admin, password });
    const createdUserAccount = await this.prismaClient.userAccount.create({
      // @ts-ignore
      data: {
        ...res,
        id,
        ownerAccountId: admin?.id || id,
        createdBy: id,
        password: createdHashPassword,
      },
    });
    // @ts-ignore
    return { ...createdUserAccount, password: null };
  }

  async remove(id: string) {
    const deletePerson = await this.prismaClient.userAccount.delete({
      where: { id },
    });
    return deletePerson;
  }

  async findAll(query: PaginationQueryDto) {
    const {
      limit = 10,
      offset = 0,
      sortBy = 'createdAt',
      order = 'DESC',
      search,
    } = query;

    const data = await this.prismaClient.userAccount.findMany({
      where: {
        roles: UserRole.USER,
        name: {
          contains: search,
          mode: 'insensitive',
        },
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        // [sortBy]: order,
      },
    });

    return {
      data,
      meta: {
        total: data.length,
        limit,
        offset,
        hasNext: offset + limit < data.length,
      },
    };
  }
}
