import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CodeExecutingDto {
  @IsBoolean()
  @IsNotEmpty()
  isExecuting: boolean;
}
