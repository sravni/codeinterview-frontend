import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  Api as ApiCodeInterview,
  UpdateInterviewDto,
} from '../shared/clients/codeinterviewService/api';
import { User } from '../shared/user/user.decorator';
import { UserEntity } from '../shared/user/user.entity';
import { ApiAuthGuard } from '../auth/api.guard';

import { CreateInterviewDto } from './dto/create-interview.dto';
import { FilterInterviewsDto } from './dto/filter-interviews.dto';

@UseGuards(ApiAuthGuard)
@Controller('/api/interviews')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class InterviewsController {
  constructor(
    @Inject('CodeinterviewService')
    private readonly codeInterviewsService: ApiCodeInterview<unknown>,
  ) {}

  @Get('/')
  async getInterviews(@Query() params: FilterInterviewsDto) {
    try {
      const response =
        await this.codeInterviewsService.interviews.getInterviews(params);

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Post('/')
  async createInterview(
    @Body() params: CreateInterviewDto,
    @User() user: UserEntity,
  ) {
    try {
      const response =
        await this.codeInterviewsService.interviews.createInterview({
          ...params,
          authorId: user.id,
        });

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Get('/:interviewId')
  async getInterview(@Param('interviewId') interviewId: string) {
    try {
      const response =
        await this.codeInterviewsService.interviews.getInterview(interviewId);

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Patch('/:interviewId')
  async updateInterview(
    @Param('interviewId') interviewId: string,
    @Body() params: UpdateInterviewDto,
  ) {
    try {
      const response =
        await this.codeInterviewsService.interviews.updateInterview(
          interviewId,
          params,
        );

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Delete('/:interviewId')
  async removeInterview(@Param('interviewId') id: string) {
    try {
      const response =
        await this.codeInterviewsService.interviews.removeInterview(id);

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }
}
