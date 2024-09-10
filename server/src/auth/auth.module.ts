import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';

import { Api as ApiCodeInterview } from '../shared/clients/codeinterviewService/api';
import { JwtStrategy } from './jwt.strategy';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('AUTH_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get('AUTH_EXPIRED'), 10),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
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
    JwtStrategy,
    GithubStrategy,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
