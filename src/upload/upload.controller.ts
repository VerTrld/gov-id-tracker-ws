import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadImageEntity } from './entities/upload.entity';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image/:userRequirementId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageEntity })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
      fileFilter: (req, file, cb) => {
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only JPG, JPEG, or PNG files are allowed!',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async upload(
    @UploadedFile() file: any,
    @Param('userRequirementId') userRequirementId: string,
  ) {
    const url = await this.uploadService.create(file, userRequirementId);
    return { message: 'Image uploaded successfully!', url };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('view/:requirementId')
  async viewRequirement(
    @Param('requirementId') requirementId: string,
    @Req() req,
  ) {
    console.log('REQ.USER:', req.user); // logs full user object
    console.log('USER ID:', req.user.id); // logs only the userId

    const userId = req.user.userId;
    return this.uploadService.viewRequirement(userId, requirementId);
  }
}
