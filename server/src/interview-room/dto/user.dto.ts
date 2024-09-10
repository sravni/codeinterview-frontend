import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { trim } from '../../shared/helpers/cast.helper';

export class UserDto {
  @ApiProperty({
    description: 'id пользователя',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Имя пользователя',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({
    description: 'Фото пользователя',
  })
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  photo: string;
}
