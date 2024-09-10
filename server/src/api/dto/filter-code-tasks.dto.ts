import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { toNumber, trim } from '../../shared/helpers/cast.helper';
import { GetCodeTasksParamsLanguageEnum } from '../../shared/clients/codeinterviewService/api';

export class FilterCodeTasksDto {
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(GetCodeTasksParamsLanguageEnum)
  @IsOptional()
  language?: GetCodeTasksParamsLanguageEnum;

  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  @IsOptional()
  skip?: number;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  order?: string;
}
