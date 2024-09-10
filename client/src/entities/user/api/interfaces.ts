export interface UserDto {
  id: string;
  displayName: string;
  
  email?: string;
  photo?: string;
  isAdmin?: boolean;
}