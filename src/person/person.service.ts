import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class PersonService {
  constructor(private prismaClient: PrismaClient) {}

  async findAll() {
    const data = await this.prismaClient.person.findMany();
    const result = data.map(({ password, ...rest }) => rest);
    return result;
  }

  async create(createPersonDto: CreatePersonDto) {
    const hashPassword = await argon2.hash(createPersonDto.password);
    const createPerson = await this.prismaClient.person.create({
      data: {
        ...createPersonDto,
        password: hashPassword,
      },
    });

    return createPerson;
  }

  async remove(id: string) {
    const deletePerson = await this.prismaClient.person.delete({
      where: { id },
    });
    return deletePerson;
  }
}
