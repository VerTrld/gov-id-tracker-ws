import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { CreateUserRequirementDto } from './dto/create-user-requirement.dto';
import { UserRequirementService } from './user-requirement.service';
import { UserRequirement } from './entities/user-requirement.entity';
import { UpdateUserRequirementDto } from './dto/update-user-requirement.dto';

@UseGuards(JwtAuthGuard)
@ApiBasicAuth()
@Controller('user-requirement')
export class UserRequirementController {
  constructor(
    private readonly userRequirementService: UserRequirementService,
  ) {}

  @Post()
  async create(@Req() req, @Body() createUserRequirementDto: UserRequirement) {
    const userId = req.user.userId;
    return this.userRequirementService.create(userId, createUserRequirementDto);
  }

  @Get()
  findAll() {
    return this.userRequirementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequirementService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string) {
    return this.userRequirementService.update(id);
  }

  // @Patch('/update/toggle')
  // update(
  //   @OwnerIdParam() ownerId: string,
  //   @UserIdParam() userId: string,
  //   @Body() createUserRequirementDto: any,
  // ) {
  //   return this.userRequirementService.update(
  //     ownerId,
  //     userId,
  //     createUserRequirementDto,
  //   );
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequirementService.remove(+id);
  }
}
