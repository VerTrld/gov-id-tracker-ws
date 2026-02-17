import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './user-account/user-account.module';
import { UploadModule } from './upload/upload.module';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/stategy/jwt.strategy';
import { IdTypeModule } from './id-type/id-type.module';
import { IdTypeRequirementModule } from './id-type-requirement/id-type-requirement.module';
import { ApplicationModule } from './application/application.module';
import { UserRequirement } from './user-requirement/entities/user-requirement.entity';
import { UserRequirementModule } from './user-requirement/user-requirement.module';
import { RequirementModule } from './requirement/requirement.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PrismaModule,
    AuthModule,
    UserAccountModule,
    UploadModule,
    IdTypeModule,
    IdTypeRequirementModule,
    ApplicationModule,
    UserRequirementModule,
    RequirementModule,
    EmailModule,
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
  // controllers: [AppController],
  // useClass: RolesGuard,
})
export class AppModule {}
