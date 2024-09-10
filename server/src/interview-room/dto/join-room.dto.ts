import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { trim } from '../../shared/helpers/cast.helper';
import { UserDto } from './user.dto';

export class JoinRoomDto {
  @ApiProperty({
    description: 'ID интервью',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'Пользователь который зашел в комнату',
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
