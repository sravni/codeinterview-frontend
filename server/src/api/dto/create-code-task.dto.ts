import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { trim } from '../../shared/helpers/cast.helper';
import { CreateCodeTaskDtoLanguageEnum } from '../../shared/clients/codeinterviewService/api';

export class CreateCodeTaskDto {
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(CreateCodeTaskDtoLanguageEnum)
  language: CreateCodeTaskDtoLanguageEnum;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  code: string;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  answer: string;
}
