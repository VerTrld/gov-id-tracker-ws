import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OwnerIdParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // const ownerAccountId = request.user.ownerAccountId;
    console.log({ request });
    return 'd06c279c-2695-40ee-a610-7d35699968d9';
    // if (ownerAccountId) {
    //   return ownerAccountId;
    // }
    // throw new BadRequestException();
  },
);
