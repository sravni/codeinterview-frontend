import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  UpdateInterviewDtoLanguageEnum,
  UpdateInterviewDtoStatusEnum,
} from '../../shared/clients/codeinterviewService/api';
import { trim } from '../../shared/helpers/cast.helper';

export class UpdateInterviewDto {
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(UpdateInterviewDtoLanguageEnum)
  @IsOptional()
  language: UpdateInterviewDtoLanguageEnum;

  @IsEnum(UpdateInterviewDtoStatusEnum)
  @IsOptional()
  status: UpdateInterviewDtoStatusEnum;
}
