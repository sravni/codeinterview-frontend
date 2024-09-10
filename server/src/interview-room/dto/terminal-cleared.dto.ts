import { ValidateNested } from 'class-validator';
import { UserDto } from './user.dto';

export class TerminalClearedDto {
  @ValidateNested()
  user: UserDto;
}
