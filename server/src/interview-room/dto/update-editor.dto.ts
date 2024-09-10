import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { trim } from '../../shared/helpers/cast.helper';

export class UpdateEditorDto {
  @ApiProperty({
    description: 'ID комнаты',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'ID интервью',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  interviewId: string;

  @ApiProperty({
    description: 'Значение в редакторе',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
