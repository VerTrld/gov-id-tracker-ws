import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateFirstUserAccountDto } from './dto/create-user-account.dto';
import { UserAccountService } from './user-account.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UserRoles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { ApiBasicAuth } from '@nestjs/swagger';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(JwtAuthGuard)
@ApiBasicAuth()
@Controller('user-account')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Post('create/one')
  async create(
    @Body() createUserAccountDto: CreateFirstUserAccountDto,
    @UserIdParam() userId?: string,
    @OwnerIdParam() ownerId?: string,
  ) {
    return await this.userAccountService.create(
      {
        ...createUserAccountDto,
        roles: UserRoles.USER,
      },
      ownerId,
      userId,
    );
  }

  @Post('create/first-user')
  async createFirstUser() {
    const [email, password, name] = (process.env.FIRST_USER as string)?.split(
      ':',
    );
    return await this.userAccountService.createFirstUser({
      name,
      email,
      password,
    });
  }

  // @Put('update/:id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserAccountDto: UpdateUserAccountDto,
  // ) {
  //   return await this.userAccountService.update(id, updateUserAccountDto);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async update(@Req() req, @Body() updateUserAccountDto: UpdateUserAccountDto) {
    const id = req.user.userId;
    return await this.userAccountService.update(id, updateUserAccountDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userAccountService.remove(id);
  }

  @Get('users/list')
  async findAll(@Query() query: PaginationQueryDto) {
    return await this.userAccountService.findAll(query);
  }
}
