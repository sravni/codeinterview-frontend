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
  CreateCodeTaskDto,
  UpdateCodeTaskDto,
} from '../shared/clients/codeinterviewService/api';
import { User } from '../shared/user/user.decorator';
import { FilterCodeTasksDto } from './dto/filter-code-tasks.dto';
import { UserEntity } from '../shared/user/user.entity';
import { ApiAuthGuard } from '../auth/api.guard';

@UseGuards(ApiAuthGuard)
@Controller('/api/codeTasks')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class CodeTasksController {
  constructor(
    @Inject('CodeinterviewService')
    private readonly codeInterviewsService: ApiCodeInterview<unknown>,
  ) {}

  @Get('/')
  async getCodeTasks(@Query() params: FilterCodeTasksDto) {
    try {
      const response =
        await this.codeInterviewsService.codeTasks.getCodeTasks(params);

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Post('/')
  async createCodeTask(
    @Body() params: CreateCodeTaskDto,
    @User() user: UserEntity,
  ) {
    try {
      const response =
        await this.codeInterviewsService.codeTasks.createCodeTask({
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

  @Delete('/:codeTaskId')
  async removeCodeTask(@Param('codeTaskId') codeTaskId: string) {
    try {
      const response =
        await this.codeInterviewsService.codeTasks.removeCodeTask(codeTaskId);

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Get('/:codeTaskId')
  async getCodeTask(@Param('codeTaskId') codeTaskId: string) {
    try {
      const response =
        await this.codeInterviewsService.codeTasks.getCodeTask(codeTaskId);

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }

  @Patch('/:codeTaskId')
  async updateInterview(
    @Param('codeTaskId') codeTaskId: string,
    @Body() params: UpdateCodeTaskDto,
  ) {
    try {
      const response =
        await this.codeInterviewsService.codeTasks.updateCodeTask(
          codeTaskId,
          params,
        );

      return response.data;
    } catch (e) {
      const status = e.response?.status;

      if (!status) throw e;

      throw new HttpException(e.response?.data, e.response?.status);
    }
  }
}
