import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { RedisIoAdapter } from './interview-room/redis-io.adapter';

const ASSETS_PATH = join(process.cwd(), '../client/build/static');
const TEMPLATES_PATH = join(process.cwd(), '../client/build');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService: ConfigService = app.get(ConfigService);
  const isDevelopment = configService.get('ENV') === 'development';
  const port = configService.get('PORT') || 3001;

  if (isDevelopment) {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  if (!isDevelopment) {
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
  }

  app.useStaticAssets(ASSETS_PATH, { redirect: false, prefix: '/static' });
  app.setBaseViewsDir(TEMPLATES_PATH);
  app.engine('html', hbs.__express);
  app.setViewEngine('html');
  app.use(cookieParser());

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
