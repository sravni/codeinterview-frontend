import {
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  Inject,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import {
  Api as ApiCodeInterview,
  InterviewDtoStatusEnum,
} from '../shared/clients/codeinterviewService/api';
import { User } from '../shared/user/user.decorator';
import { UserEntity } from '../shared/user/user.entity';
import { InterviewPublicDto } from './dto/interview-public.dto';

@Controller('/api/interviews')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class InterviewsPublicController {
  constructor(
    @Inject('CodeinterviewService')
    private readonly codeInterviewsService: ApiCodeInterview<unknown>,
  ) {}

  @Get('/:interviewId/room')
  async getInterviewForRoom(
    @Param('interviewId') interviewId: string,
    @User() user: UserEntity,
  ) {
    try {
      const response =
        await this.codeInterviewsService.interviews.getInterview(interviewId);

      const { data } = response;

      if (user && user.isAdmin) {
        return data;
      }

      if (data.status === InterviewDtoStatusEnum.Archived)
        throw new ForbiddenException('Interview is archived');

      const dto = plainToInstance(InterviewPublicDto, data, {
        excludeExtraneousValues: true,
      });

      return dto;
    } catch (e) {
      if (e instanceof HttpException) throw e;
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }
}
