import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from './user.interfaces';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as RequestWithUser;
    const user = req.user;

    return user;
  },
);
