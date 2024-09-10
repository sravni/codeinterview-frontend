import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

import { UserEntity } from '../shared/user/user.entity';
import { extractJwtFromCookies } from './jwt.helpers';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const cookieValue = extractJwtFromCookies(
      this.configService.get('AUTH_COOKIE'),
    )(req);

    if (cookieValue) {
      const payload = await this.jwtService.verifyAsync<UserEntity>(
        cookieValue,
        {
          secret: this.configService.get('AUTH_SECRET'),
        },
      );

      if (payload) {
        req['user'] = plainToInstance(UserEntity, payload, {
          excludeExtraneousValues: true,
        });
      }
    }

    next();
  }
}
