import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { WebsocketExceptionsFilter } from '../shared/exceptions/websocket-exceptions.filter';

import { EVENTS } from './interview-room.consts';
import { JoinRoomDto } from './dto/join-room.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';
import { InterviewRoomService } from './interview-room.service';
import { CloseRoomDto } from './dto/close-room.dto';
import { LeaveInterviewRoomDto } from './dto/leave-room.dto';
import { ExecuteCodeDto } from './dto/execute-code.dto';
import { SandboxService } from './sandbox.service';
import { TerminalClearDto } from './dto/terminal-clear.dto';
import { plainToInstance } from 'class-transformer';
import { UsersListUpdatedDto } from './dto/users-list-updated.dto';
import { EditorUpdatedDto } from './dto/editor-updated.dto';
import { CodeExecutingDto } from './dto/code-executing.dto';
import { CodeExecutedDto } from './dto/code-executed.dto';
import { TerminalClearedDto } from './dto/terminal-cleared.dto';

const PING_INTERVAL = 25 * 1000;
const PING_TIMEOUT = PING_INTERVAL - 5 * 1000;
const USER_IN_ROOM_TTL = PING_INTERVAL + 5 * 1000;

@WebSocketGateway({
  namespace: 'interviewRoom',
  pingTimeout: PING_TIMEOUT,
  pingInterval: PING_INTERVAL,
  transports: ['websocket'],
})
@UseFilters(WebsocketExceptionsFilter)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class InterviewRoomGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(InterviewRoomGateway.name);

  constructor(
    private readonly interviewRoomService: InterviewRoomService,
    private readonly sandboxService: SandboxService,
  ) {}

  @WebSocketServer() io: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(`Socket id=${client.id} connected`);

    client.on('disconnecting', () => {
      client.rooms.forEach(async (roomId) => {
        await this.interviewRoomService.removeUserBySocketId({
          roomId,
          socketId: client.id,
        });
        const users = await this.interviewRoomService.getUsers(roomId);

        this.io
          .in(roomId)
          .emit(
            EVENTS.USERS_LIST_UPDATED,
            plainToInstance(UsersListUpdatedDto, { users }),
          );
      });
    });

    client.conn.on('packet', async (packet) => {
      if (packet && packet.type === 'pong') {
        client.rooms.forEach(async (roomId) => {
          await this.interviewRoomService.keepAliveUser({
            roomId,
            socketId: client.id,
            ttl: USER_IN_ROOM_TTL,
          });
        });
      }
    });
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Socket id=${client.id} disconnected`);
  }

  @SubscribeMessage(EVENTS.USER_JOIN_ROOM)
  public async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() params: JoinRoomDto,
  ) {
    const { roomId, user } = params;

    const isUserAlreadyInRoom = await this.interviewRoomService.hasUser({
      roomId,
      userId: user.id,
    });

    if (isUserAlreadyInRoom) {
      client.emit('exception', {
        status: 'error',
        message: `User id=${user.id} already in room id=${roomId}`,
      });
      client.disconnect();
      return;
    }

    client.join(roomId);

    try {
      await this.interviewRoomService.setUser({
        roomId,
        user,
        socketId: client.id,
        ttl: USER_IN_ROOM_TTL,
      });
    } catch (error: any) {
      throw new WsException(error.message);
    }

    const users = await this.interviewRoomService.getUsers(roomId);

    this.io
      .to(roomId)
      .emit(
        EVENTS.USERS_LIST_UPDATED,
        plainToInstance(UsersListUpdatedDto, { users }),
      );
    this.logger.log(`User id=${user.id} joined room id=${roomId}`);
  }

  @SubscribeMessage(EVENTS.USER_LEAVE_ROOM)
  public async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() params: LeaveInterviewRoomDto,
  ) {
    const { roomId, user } = params;

    client.leave(roomId);

    try {
      await this.interviewRoomService.removeUser({ roomId, userId: user.id });
    } catch (error: any) {
      this.logger.log(
        `Cliend id: ${client.id} can not be removed from roomID ${roomId}. Error - ${error.message}`,
      );
    }

    const users = await this.interviewRoomService.getUsers(roomId);

    this.io
      .to(roomId)
      .emit(
        EVENTS.USERS_LIST_UPDATED,
        plainToInstance(UsersListUpdatedDto, { users }),
      );
  }

  @SubscribeMessage(EVENTS.EDITOR_UPDATE)
  public editorUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() params: UpdateEditorDto,
  ) {
    const { roomId, interviewId, code } = params;
    client.broadcast
      .to(roomId)
      .emit(EVENTS.EDITOR_UPDATED, plainToInstance(EditorUpdatedDto, { code }));

    this.interviewRoomService.updateInterview(interviewId, {
      code,
    });
  }

  @SubscribeMessage(EVENTS.CODE_EXECUTE)
  public async codeExecute(
    @ConnectedSocket() client: Socket,
    @MessageBody() params: ExecuteCodeDto,
  ) {
    const { roomId, code, language } = params;

    this.io
      .to(roomId)
      .emit(
        EVENTS.CODE_EXECUTING,
        plainToInstance(CodeExecutingDto, { isExecuting: true }),
      );

    try {
      const [executeResponse, user] = await Promise.all([
        this.sandboxService.execute({ code, language }),
        this.interviewRoomService.getUserBySocketId(client.id),
      ]);

      this.io.to(roomId).emit(
        EVENTS.CODE_EXECUTED,
        plainToInstance(CodeExecutedDto, {
          user,
          data: executeResponse.data,
        }),
      );
    } catch (error) {
      console.log(error);
      this.io
        .to(roomId)
        .emit(
          EVENTS.CODE_EXECUTING,
          plainToInstance(CodeExecutingDto, { isExecuting: false }),
        );
      throw new WsException(`Ошибка при выполнении кода - ${error.message}`);
    }
  }

  @SubscribeMessage(EVENTS.TERMINAL_CLEAR)
  public async terminalClear(
    @ConnectedSocket() client: Socket,
    @MessageBody() params: TerminalClearDto,
  ) {
    const { roomId } = params;

    const user = await this.interviewRoomService.getUserBySocketId(client.id);

    this.io
      .to(roomId)
      .emit(
        EVENTS.TERMINAL_CLEARED,
        plainToInstance(TerminalClearedDto, { user }),
      );
  }

  @SubscribeMessage(EVENTS.ROOM_CLOSE)
  public roomClose(@MessageBody() params: CloseRoomDto) {
    const { roomId } = params;

    this.io.to(roomId).emit(EVENTS.ROOM_CLOSED);
  }
}
