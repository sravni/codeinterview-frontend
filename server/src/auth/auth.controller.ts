import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../shared/user/user.decorator';
import { UserEntity } from '../shared/user/user.entity';
import { instanceToPlain } from 'class-transformer';
import { PageAuthGuard } from './page.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  @Get('/login')
  @UseGuards(PageAuthGuard)
  async githubSignIn() {
    // With `@UseGuards(PageAuthGuard)` we are using an AuthGuard that @nestjs/passport
    // automatically provisioned for us when we extended the passport-github strategy.
    // The Guard initiates the passport-github flow.
  }

  @Get('/callback')
  @UseGuards(PageAuthGuard)
  async githubAuthCallback(
    @User() user: UserEntity,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Passport automatically creates a `user` object, based on the return value of our
    // GithubOauthStrategy#validate() method, and assigns it to the Request object as `req.user`

    const accessToken = await this.jwtService.signAsync(instanceToPlain(user));

    const authCookieName = this.configService.get('AUTH_COOKIE');
    const returnCookieName = this.configService.get('AUTH_COOKIE_RETURN');

    res.cookie(authCookieName, accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: parseInt(this.configService.get('AUTH_EXPIRED'), 10),
    });
    res.clearCookie(returnCookieName);

    const returnUrl = req.cookies[returnCookieName];
    return res.redirect(returnUrl || '/');
  }
}
