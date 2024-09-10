import { Module } from '@nestjs/common';
import { RedisModule } from '@webeleon/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Api as ApiCodeInterview } from '../shared/clients/codeinterviewService/api';
import { Api as ApiCodeInterviewSandbox } from '../shared/clients/codeinterviewSandboxService/api';
import { InterviewRoomGateway } from './interview-room.gateway';
import { InterviewRoomService } from './interview-room.service';
import { SandboxService } from './sandbox.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('REDIS'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    InterviewRoomGateway,
    {
      provide: 'CodeinterviewService',
      useFactory: (config: ConfigService) => {
        return new ApiCodeInterview({
          baseURL: config.get('CODEINTERVIEW'),
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'CodeinterviewSandbox',
      useFactory: (config: ConfigService) => {
        return new ApiCodeInterviewSandbox({
          baseURL: config.get('CODEINTERVIEW_SANDBOX'),
        });
      },
      inject: [ConfigService],
    },
    InterviewRoomService,
    SandboxService,
  ],
})
export class InterviewRoomModule {}
