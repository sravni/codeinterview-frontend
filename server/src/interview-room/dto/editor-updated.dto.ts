import { IsOptional, IsString } from 'class-validator';

export class EditorUpdatedDto {
  @IsString()
  @IsOptional()
  code: string;
}
