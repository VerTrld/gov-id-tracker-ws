import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const person = await this.authService.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );

    if (!person) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(person);
  }
}
