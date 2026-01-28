import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImage } from './entities/upload.entity';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImage })
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    fileFilter: (req, file, cb) => {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        return cb(new BadRequestException('Only JPG, JPEG, or PNG files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async upload(@UploadedFile() file: any) {
    const url = await this.uploadService.create(file);
    return { message: 'Image uploaded successfully!', url };
  }

}
