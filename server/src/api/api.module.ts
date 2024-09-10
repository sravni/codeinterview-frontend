import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Api as ApiCodeInterview } from '../shared/clients/codeinterviewService/api';
import { AuthModule } from '../auth/auth.module';

import { InterviewsController } from './interviews.controller';
import { InterviewsPublicController } from './interviews-public.controller';
import { RatingsController } from './ratings.controller';
import { CodeTasksController } from './code-tasks.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    InterviewsController,
    InterviewsPublicController,
    RatingsController,
    CodeTasksController,
    UsersController,
  ],
  providers: [
    {
      provide: 'CodeinterviewService',
      useFactory: (config: ConfigService) => {
        return new ApiCodeInterview({
          baseURL: config.get('CODEINTERVIEW'),
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiModule {}
