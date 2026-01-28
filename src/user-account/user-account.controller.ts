import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { UserAccountService } from './user-account.service';

@Controller('userAccount')
export class PersonController {
  constructor(private readonly userAccountService: UserAccountService) {}
  @Post('create/first-user')
  createFirstUser() {
    const [email, password, name] = (process.env.FIRST_USER as string)?.split(
      ':',
    );
    return this.userAccountService.createFirstUser({
      name,
      email,
      password,
      roles: UserRoles.SUPER_ADMIN,
    });
  }

  @Post('create')
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    return this.userAccountService.create(createUserAccountDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userAccountService.remove(id);
  }
}
