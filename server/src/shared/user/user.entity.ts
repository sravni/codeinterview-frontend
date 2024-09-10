import { Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  displayName: string;
  @Expose()
  photo: string;

  @Expose()
  isAdmin: boolean;
}
