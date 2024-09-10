import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { trim } from '../../shared/helpers/cast.helper';
import {
  CreateInterviewDtoLanguageEnum,
  CreateInterviewDtoStatusEnum,
} from '../../shared/clients/codeinterviewService/api';

export class CreateInterviewDto {
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsNotEmpty()
  intervieweeName: string;

  @IsEnum(CreateInterviewDtoLanguageEnum)
  language: CreateInterviewDtoLanguageEnum;

  @IsEnum(CreateInterviewDtoStatusEnum)
  status: CreateInterviewDtoStatusEnum;
}
