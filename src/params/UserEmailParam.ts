import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const UserEmailParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const ownerAccountId = request.user.ownerAccountId;
    if (ownerAccountId) {
      return ownerAccountId;
    }
    throw new BadRequestException();
  },
);
