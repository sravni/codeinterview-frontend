import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { toNumber, trim } from '../../shared/helpers/cast.helper';
import {
  GetInterviewsParamsLanguageEnum,
  GetInterviewsParamsStatusEnum,
} from '../../shared/clients/codeinterviewService/api';

export class FilterInterviewsDto {
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  title?: string;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  intervieweeName?: string;

  @IsEnum(GetInterviewsParamsLanguageEnum)
  @IsOptional()
  language?: GetInterviewsParamsLanguageEnum;

  @IsEnum(GetInterviewsParamsStatusEnum)
  @IsOptional()
  status?: GetInterviewsParamsStatusEnum;

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
