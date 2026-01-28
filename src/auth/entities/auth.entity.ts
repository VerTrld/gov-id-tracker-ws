import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Auth {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
