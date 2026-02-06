import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserIdParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const sub = request.user.sub;
    // if (sub) {
    //   return sub;
    // }
    // throw new BadRequestException();
  },
);
