import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { trim } from '../../shared/helpers/cast.helper';
import { ExecuteCodeDtoLanguageEnum } from '../../shared/clients/codeinterviewSandboxService/api';

export class ExecuteCodeDto {
  @ApiProperty({
    description: 'ID комнаты',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'Код для исполнения',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(ExecuteCodeDtoLanguageEnum)
  language: ExecuteCodeDtoLanguageEnum;
}
