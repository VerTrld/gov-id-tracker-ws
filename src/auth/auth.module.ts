import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaClient, JwtService, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
