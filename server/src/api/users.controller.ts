import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Api as ApiCodeInterview } from '../shared/clients/codeinterviewService/api';
import { UserEntity } from '../shared/user/user.entity';
import { ApiAuthGuard } from '../auth/api.guard';

@UseGuards(ApiAuthGuard)
@Controller('/api/users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UsersController {
  constructor(
    @Inject('CodeinterviewService')
    private readonly codeInterviewsService: ApiCodeInterview<unknown>,
  ) {}

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    try {
      const response = await this.codeInterviewsService.users.getUser(userId);

      const { data } = response;

      return plainToInstance(UserEntity, data, {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      if (e instanceof HttpException) throw e;
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }
}
