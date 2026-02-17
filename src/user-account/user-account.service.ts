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
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserAccountService {
  constructor(
    private prismaClient: PrismaClient,
    private authService: AuthService,
  ) {}

  async hashPassword(password: string) {
    const hashPassword = await argon2.hash(password);
    return hashPassword;
  }

  async createFirstUser(createUserAccountDto: CreateFirstUserAccountDto) {
    const createdFirstUser = await this.create(
      {
        ...createUserAccountDto,
        roles: UserRole.SUPER_ADMIN,
      },
      undefined,
      undefined,
    );
    return createdFirstUser;
  }

  async create(
    createUserAccountDto: CreateUserAccountDto,
    ownerId?: string,
    userId?: string,
  ) {
    const { password, ...res } = createUserAccountDto;
    const idv4 = uuidv4();
    const id = idv4;
    const admin = await this.prismaClient.userAccount.findFirst({
      where: {
        roles: UserRole.SUPER_ADMIN,
      },
    });
    console.log({ id });

    const createdHashPassword = await this.hashPassword(password);
    const createdUserAccount = await this.prismaClient.userAccount.create({
      // @ts-ignore
      data: {
        ...res,
        id,
        ownerAccountId: ownerId || admin?.id || id,
        createdBy: userId || id,
        password: createdHashPassword,
      },
    });
    return _.omit(createdUserAccount, ['password']);
  }

  async update(
    ownerId: string,
    userId: string,
    updateUserAccountDto: UpdateUserAccountDto,
  ) {
    const { currentPassword, newPassword, ...resDto } = updateUserAccountDto;

    const user = await this.prismaClient.userAccount.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw Error('Invalid User');
    }

    const validateUser = await this.authService.validateUser(
      user.email,
      currentPassword,
    );

    if (!validateUser) {
      throw Error('Invalid credentials');
    }

    if (updateUserAccountDto.newPassword) {
      updateUserAccountDto.newPassword = await this.hashPassword(
        updateUserAccountDto.newPassword,
      );
    }

    const updatedUser = await this.prismaClient.userAccount.update({
      where: { ownerAccountId: ownerId, id: userId },
      data: {
        ...resDto,
        password: updateUserAccountDto.newPassword,
      },
    });

    return _.omit(updatedUser, ['password']);
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
