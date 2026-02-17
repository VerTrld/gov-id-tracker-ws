import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRequirementsService } from './user-requirement.service';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user-requirements')
export class UserRequirementsController {
  constructor(
    private readonly userRequirementsService: UserRequirementsService,
  ) {}

  // Get all requirements completed by current user
  @Get('/read/all')
  findMine(@OwnerIdParam() ownerId: string, @UserIdParam() userId: string) {
    return this.userRequirementsService.findByUser(ownerId, userId);
  }

  // Complete / Upload a requirement
  @Patch('/update/:requirementId')
  complete(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Param('requirementId') requirementId: string,
    // @Body()
    // body: {
    //   fileUrl?: string;
    //   expiresAt?: Date;
    // },
  ) {
    console.log({ requirementId });
    return this.userRequirementsService.complete(
      ownerId,
      userId,
      requirementId,
    );
  }

  // Admin verify requirement
  @Patch(':id/verify')
  verify(@Param('id') id: string) {
    return this.userRequirementsService.verify(id);
  }
}
