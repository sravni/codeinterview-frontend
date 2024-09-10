import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../shared/user/user.decorator';
import { UserEntity } from '../shared/user/user.entity';

@Controller('/')
export class PagesController {
  constructor(private configService: ConfigService) {}

  @Get('*')
  @Render('index')
  getHome(@User() user: UserEntity) {
    return {
      state: JSON.stringify({ user }),
      env: JSON.stringify({
        BFF: this.configService.get('BFF'),
        INTERVIEW_ROOM_WEBSOCKET: this.configService.get(
          'INTERVIEW_ROOM_WEBSOCKET',
        ),
      }),
    };
  }
}
