import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { CreateFirstUserAccountDto } from './dto/create-user-account.dto';
import { UserAccountService } from './user-account.service';

@Controller('userAccount')
export class PersonController {
  constructor(private readonly userAccountService: UserAccountService) {}
  @Post('create/one')
  async create(@Body() createUserAccountDto: CreateFirstUserAccountDto) {
    console.log({ createUserAccountDto });
    return await this.userAccountService.create({
      ...createUserAccountDto,
      roles: UserRoles.USER,
    });
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

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userAccountService.remove(id);
  }
}
