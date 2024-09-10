import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { trim } from '../../shared/helpers/cast.helper';

export class TerminalClearDto {
  @ApiProperty({
    description: 'ID комнаты',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  roomId: string;
}
