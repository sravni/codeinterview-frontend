import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';

import {
  Api as ApiCodeInterview,
  UserDto,
} from '../shared/clients/codeinterviewService/api';
import { TGithubProfile } from './github.strategy.interfaces';
import { UserEntity } from '../shared/user/user.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private configService: ConfigService;

  constructor(
    configService: ConfigService,
    @Inject('CodeinterviewService')
    private codeInterviewsService: ApiCodeInterview<unknown>,
  ) {
    super({
      clientID: configService.get('AUTH_GITHUB_CLIENT_ID'),
      clientSecret: configService.get('AUTH_GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('AUTH_GITHUB_CLIENT_CALLBACK'),
      scope: ['public_profile'],
    });

    this.configService = configService;
  }

  private _decorateUserByIsAdmin(user: UserDto) {
    const adminEmails = JSON.stringify(
      this.configService.get('AUTH_ADMIN_EMAILS', '[]'),
    );

    if (adminEmails.includes(user.email)) {
      return {
        ...user,
        isAdmin: true,
      };
    }

    return user;
  }
  async validate(_at, _rt, profile: TGithubProfile, done) {
    const { emails, displayName, photos } = profile;

    if (!Array.isArray(emails) || emails.length === 0) {
      return done(new BadRequestException('Email must exist'));
    }

    try {
      const { data: user } =
        await this.codeInterviewsService.users.getUserByEmail(emails[0].value);
      return done(
        null,
        plainToInstance(UserEntity, this._decorateUserByIsAdmin(user), {
          excludeExtraneousValues: true,
        }),
      );
    } catch (error: any) {
      if (error.response?.data?.statusCode !== 404) return done(error, null);
    }

    try {
      const createDto = {
        email: emails[0].value,
        displayName,
        ...(Array.isArray(photos) && photos.length > 0
          ? { photo: photos[0].value }
          : {}),
      };

      const { data: newUser } =
        await this.codeInterviewsService.users.createUser(createDto);

      return done(
        null,
        plainToInstance(UserEntity, this._decorateUserByIsAdmin(newUser), {
          excludeExtraneousValues: true,
        }),
      );
    } catch (error: any) {
      return done(error, null);
    }
  }
}
