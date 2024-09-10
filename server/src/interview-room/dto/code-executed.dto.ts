import { IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { ExecuteCodeResponseDto } from '../../shared/clients/codeinterviewSandboxService/api';
import { UserDto } from './user.dto';

export class CodeExecutedDto {
  @IsObject()
  @IsNotEmptyObject()
  data: ExecuteCodeResponseDto;

  @ValidateNested()
  user: UserDto;
}
