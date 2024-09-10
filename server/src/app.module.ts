import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from 'nestjs-http-logger';

import { PagesModule } from './pages/pages.module';
import { ApiModule } from './api/api.module';
import { InterviewRoomModule } from './interview-room/interview-room.module';
import { InternalModule } from './internal/internal.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiModule,
    InterviewRoomModule,
    InternalModule,
    AuthModule,
    PagesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
