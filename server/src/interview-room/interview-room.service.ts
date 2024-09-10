import { Inject, Injectable } from '@nestjs/common';
import { throttle } from 'helpful-decorators';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { UserDto } from './dto/user.dto';
import { Api as ApiCodeInterview } from '../shared/clients/codeinterviewService/api';

type UpdateInterviewParams = Parameters<
  ApiCodeInterview<unknown>['interviews']['updateInterview']
>;

const ROOM_TTL = 24 * 60 * 60; // текущая версия редиса работает с секундами

export type THasUserParams = {
  roomId: string;
  userId: UserDto['id'];
};

export type TSetUserParams = {
  roomId: string;
  user: UserDto;
  socketId: string;
  ttl: number;
};

export type TRemoveUserParams = {
  roomId: string;
  userId: UserDto['id'];
};

export type TRemoveUserBySocketParams = {
  roomId: string;
  socketId: string;
};

export type TKeepAliveUserParams = {
  roomId: string;
  socketId: string;
  ttl: number;
};

@Injectable()
export class InterviewRoomService {
  constructor(
    @Inject('CodeinterviewService')
    private readonly codeInterviewsService: ApiCodeInterview<unknown>,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
  ) {}

  @throttle(100)
  public async updateInterview(
    id: UpdateInterviewParams[0],
    data: UpdateInterviewParams[1],
  ) {
    return this.codeInterviewsService.interviews.updateInterview(id, data);
  }

  private generateRoomKey(roomId: string) {
    return `InterviewRoom:Rooms:${roomId}`;
  }

  private generateUserKey(userId: string) {
    return `InterviewRoom:Users:${userId}`;
  }

  private generateRoomSocketsKey(socketId: string) {
    return `InterviewRoom:Socket:${socketId}`;
  }

  public async hasUser(params: THasUserParams) {
    const { roomId, userId } = params;
    const startTime = Date.now();

    const [, score] = await this.redisClient
      .multi()
      .zRemRangeByScore(this.generateRoomKey(roomId), '-inf', startTime)
      .zScore(this.generateRoomKey(roomId), userId)
      .exec();

    return score !== null;
  }

  public async getUsers(roomId: string) {
    const usersIds: string[] | null = await this.redisClient.zRangeByScore(
      this.generateRoomKey(roomId),
      Date.now(),
      'inf',
    );

    if (usersIds === null || usersIds.length === 0) return [];

    const usersAsStrings = await this.redisClient.mGet(
      usersIds.map((userId) => this.generateUserKey(userId)),
    );

    return usersAsStrings.map(
      (userAsString) => JSON.parse(userAsString) as UserDto,
    );
  }

  public async getUserBySocketId(socketId: string): Promise<string | null> {
    const userId = await this.redisClient.get(
      this.generateRoomSocketsKey(socketId),
    );
    if (!userId) return null;

    const userAsString = await this.redisClient.get(
      this.generateUserKey(userId),
    );

    if (!userAsString) return null;

    return JSON.parse(userAsString);
  }

  public async setUser(params: TSetUserParams): Promise<void> {
    const { roomId, socketId, user, ttl } = params;

    const startTime = Date.now();
    const result = await this.redisClient
      .multi()
      // Запоминаем что пользователь с ID находится в комнате roomId
      .zAdd(
        this.generateRoomKey(roomId),
        {
          score: startTime + ttl,
          value: user.id,
        },
        {
          NX: true,
        },
      )
      .expire(this.generateRoomKey(roomId), ROOM_TTL)
      // Запоминаем связь между socket и пользователем, чтобы при дисконекте найти человека и убрать его из комнаты
      .set(this.generateRoomSocketsKey(socketId), user.id, {
        EX: ROOM_TTL,
        NX: true,
      })
      // Удаляем всех пользователь из комнаты roomId у которых score между минус бескончностью и текущей датой
      .zRemRangeByScore(this.generateRoomKey(roomId), '-inf', startTime)
      // Запоминаем информацию о пользователе
      .set(this.generateUserKey(user.id), JSON.stringify(user), {
        EX: ROOM_TTL,
        NX: true,
      })
      .exec();

    if (result === null)
      throw new Error(`Can not save user (${user.id}) in the room (${roomId})`);

    return;
  }

  public async removeUser(params: TRemoveUserParams): Promise<void> {
    const { roomId, userId } = params;

    const result = await this.redisClient
      .multi()
      .zRem(this.generateRoomKey(roomId), userId)
      .del(this.generateUserKey(userId))
      .exec();

    if (result === null)
      throw new Error(
        `Can not remove user (${userId}) from the room (${roomId})`,
      );
    return;
  }

  public async removeUserBySocketId(
    params: TRemoveUserBySocketParams,
  ): Promise<void> {
    const { roomId, socketId } = params;

    const userId = await this.redisClient.get(
      this.generateRoomSocketsKey(socketId),
    );

    if (!userId) return;

    await this.removeUser({ roomId, userId });

    return;
  }

  public async keepAliveUser(params: TKeepAliveUserParams) {
    const { roomId, socketId, ttl } = params;
    const userId = await this.redisClient.get(
      this.generateRoomSocketsKey(socketId),
    );

    if (!userId) return;
    const startTime = Date.now();
    const result = await this.redisClient.zAdd(
      this.generateRoomKey(roomId),
      {
        score: startTime + ttl,
        value: userId,
      },
      {
        XX: true,
      },
    );

    if (result === null)
      throw new Error(`Can not save user (${userId}) in the room (${roomId})`);
  }
}
