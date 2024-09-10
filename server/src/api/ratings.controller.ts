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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Api as ApiCodeInterview } from '../shared/clients/codeinterviewService/api';
import { User } from '../shared/user/user.decorator';
import { UserEntity } from '../shared/user/user.entity';

import { CreateInterviewRatingDto } from './dto/create-interview-rating.dto';
import { UpdateInterviewRatingDto } from './dto/update-interview-rating.dto';
import { RatingDto } from './dto/interview-rating.dto';
import { ApiAuthGuard } from '../auth/api.guard';

@UseGuards(ApiAuthGuard)
@Controller('/api/interviews')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class RatingsController {
  constructor(
    @Inject('CodeinterviewService')
    private readonly codeInterviewsService: ApiCodeInterview<unknown>,
  ) {}

  @Get('/:interviewId/ratings')
  async getInterviewRatings(
    @Param('interviewId') interviewId: string,
    @User() user: UserEntity,
  ) {
    try {
      const response = await this.codeInterviewsService.interviews.getRatings(
        interviewId,
        { authorId: user.id },
      );

      return plainToInstance(RatingDto, response.data, {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Post('/:interviewId/ratings')
  async createInterviewRating(
    @Param('interviewId') interviewId: string,
    @Body() params: CreateInterviewRatingDto,
    @User() user: UserEntity,
  ) {
    try {
      const response = await this.codeInterviewsService.interviews.createRating(
        interviewId,
        { ...params, authorId: user.id },
      );

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Patch('/:interviewId/ratings/:ratingId')
  async updateInterviewRating(
    @Param('interviewId') interviewId: string,
    @Param('ratingId') ratingId: string,
    @Body() params: UpdateInterviewRatingDto,
    @User() user: UserEntity,
  ) {
    try {
      const response = await this.codeInterviewsService.interviews.updateRating(
        interviewId,
        ratingId,
        { ...params, authorId: user.id },
      );

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Delete('/:interviewId/ratings/:ratingId')
  async removeInterviewRating(
    @Param('interviewId') interviewId: string,
    @Param('ratingId') ratingId: string,
  ) {
    try {
      const response = await this.codeInterviewsService.interviews.removeRating(
        interviewId,
        ratingId,
      );

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Get('/:interviewId/ratings/average')
  async getInterviewRatingAverage(@Param('interviewId') interviewId: string) {
    try {
      const response =
        await this.codeInterviewsService.interviews.getRatingAverage(
          interviewId,
        );

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }
}
