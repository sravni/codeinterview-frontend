import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../auth/auth.middleware';

import { PagesController } from './pages.controller';

@Module({
  imports: [AuthModule],
  controllers: [PagesController],
})
export class PagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
