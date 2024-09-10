import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class RedisIoAdapter extends IoAdapter {
  configService: ConfigService;
  logger: Logger;
  redisAdapter: ReturnType<typeof createAdapter>;

  constructor(app: INestApplication) {
    super(app);

    this.configService = app.get(ConfigService);
    this.logger = new Logger(RedisIoAdapter.name);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: this.configService.get('REDIS'),
    });
    const subClient = pubClient.duplicate();

    pubClient.on('connect', this._handleConnect.bind(this, 'Publish'));
    pubClient.on('ready', this._handleReady.bind(this, 'Publish'));
    pubClient.on('error', this._handleError.bind(this, 'Publish'));
    pubClient.on('close', this._handleClose.bind(this, 'Publish'));
    pubClient.on(
      'reconnecting',
      this._handleReconnecting.bind(this, 'Publish'),
    );
    pubClient.on('end', this._handleEnd.bind(this, 'Publish'));

    subClient.on('connect', this._handleConnect.bind(this, 'Sub'));
    subClient.on('ready', this._handleReady.bind(this, 'Sub'));
    subClient.on('error', this._handleError.bind(this, 'Sub'));
    subClient.on('close', this._handleClose.bind(this, 'Sub'));
    subClient.on('reconnecting', this._handleReconnecting.bind(this, 'Sub'));
    subClient.on('end', this._handleEnd.bind(this, 'Sub'));

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.redisAdapter = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server;

    server.adapter(this.redisAdapter);

    return server;
  }

  private _handleConnect(instanceName: string) {
    this.logger.log(`${instanceName} Redis connecting...`);
  }

  private _handleReady(instanceName: string) {
    this.logger.log(`${instanceName} Redis connected!`);
  }

  private _handleClose(instanceName: string) {
    this.logger.warn(`${instanceName} Redis disconnected!`);
  }

  private _handleReconnecting(instanceName: string) {
    this.logger.log(`${instanceName} Redis reconnecting!`);
  }

  private _handleEnd(instanceName: string) {
    this.logger.warn(`${instanceName} Redis connection ended!`);
  }

  private _handleError(instanceName: string, err: any) {
    this.logger.error(`${instanceName} Redis error occurred`, { err });
  }
}
