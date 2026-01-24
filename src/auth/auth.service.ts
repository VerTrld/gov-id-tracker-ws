import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Person } from 'src/person/entities/person.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaClient: PrismaClient,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prismaClient.person.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const passwordMatches = await argon2.verify(user.password, password);
    if (!passwordMatches) {
      return null;
    }

    return user;
  }

  async login(person: Person) {
    const payload = {
      sub: person.id,
      name: person.name,
      email: person.email,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1h',
    });

    return {
      accessToken: token,
      user: {
        id: person.id,
        name: person.name,
        email: person.email,
      },
    };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
