import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PrismaClient],
})
export class PersonModule {}
