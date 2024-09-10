import { IsArray, ValidateNested } from 'class-validator';

import { UserDto } from './user.dto';

export class UsersListUpdatedDto {
  @IsArray()
  @ValidateNested({ each: true })
  users: UserDto[];
}
