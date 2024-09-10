import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UpdateCodeTaskDtoLanguageEnum } from '../../shared/clients/codeinterviewService/api';
import { trim } from '../../shared/helpers/cast.helper';

export class UpdateCodeTaskDto {
  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(UpdateCodeTaskDtoLanguageEnum)
  @IsOptional()
  language: UpdateCodeTaskDtoLanguageEnum;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  code: string;

  @Transform(({ value }) => trim(value))
  @IsString()
  @IsOptional()
  answer: string;
}
