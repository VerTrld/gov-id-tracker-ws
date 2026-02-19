import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { Multer } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { UploadImageEntity } from 'src/upload/entities/upload.entity';
import { CreateIdTypeDto } from './dto/create-id-type.dto';
import { IdTypesService } from './id-type.service';

@UseGuards(JwtAuthGuard)
@Controller('id-types')
export class IdTypesController {
  constructor(private readonly idTypesService: IdTypesService) {}

  // Create new ID Type
  @Post('/create/one')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageEntity })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
      fileFilter: (req, file, cb) => {
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
          return cb(
            new BadRequestException('Only PNG files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createIdTypeDto: CreateIdTypeDto,
    @UploadedFile() file: Multer.File,
  ) {
    return await this.idTypesService.create(createIdTypeDto, file);
  }

  // Get all ID Types
  @Get('/read/all')
  findAll(@OwnerIdParam() ownerId: string, @UserIdParam() userId: string) {
    return this.idTypesService.findAll(ownerId, userId);
  }

  // Get one ID Type with requirements
  @Get('/read/:idTypeCode')
  async findOne(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Param('idTypeCode') idTypeCode: string,
  ) {
    return this.idTypesService.findOne(ownerId, userId, idTypeCode);
  }

  // Delete ID Type
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.idTypesService.remove(id);
  }
}
