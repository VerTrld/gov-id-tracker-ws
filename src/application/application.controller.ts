import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './application.service';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(JwtAuthGuard)
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // Apply for an ID
  @Post('/create/:idTypeId')
  async apply(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Param('idTypeId') idTypeId: string,
  ) {
    return this.applicationsService.apply(ownerId, userId, idTypeId);
  }

  // Get application details + requirements + progress
  @Get(':applicationId')
  async getOne(@Param('applicationId') applicationId: string, @Req() req: any) {
    return this.applicationsService.getApplication(req.user.id, applicationId);
  }

  // Mark requirement as completed
  @Patch('requirement/:requirementId')
  async completeRequirement(
    @Param('requirementId') requirementId: string,
    @Req() req: any,
    @Body() body: { fileUrl?: string },
  ) {
    return this.applicationsService.completeRequirement(
      req.user.id,
      requirementId,
      body.fileUrl,
    );
  }
}
