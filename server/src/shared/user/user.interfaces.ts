import { Request } from 'express';
import { UserDto } from '../clients/codeinterviewService/api';

interface RequestWithUser extends Request {
  user: UserDto;
}

export { RequestWithUser };
