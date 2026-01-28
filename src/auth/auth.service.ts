import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, UserAccount } from '@prisma/client';

import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaClient: PrismaClient,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaClient.userAccount.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    console.log({ user });

    const passwordMatches = await argon2.verify(user.password, password);

    console.log({ passwordMatches });
    if (!passwordMatches) {
      return null;
    }

    return user;
  }

  async login(user: UserAccount) {
    const { password, ...resUser } = user;
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });

    return {
      accessToken: token,
      user: {
        ...resUser,
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
