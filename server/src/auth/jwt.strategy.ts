import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../shared/user/user.entity';

import { extractJwtFromCookies } from './jwt.helpers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookies(configService.get('AUTH_COOKIE')),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('AUTH_SECRET'),
    });
  }

  async validate(payload: UserEntity, done: any) {
    if (payload.isAdmin) {
      done(null, payload);
      return;
    }

    done(new ForbiddenException());
  }
}
