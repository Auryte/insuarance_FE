import { User } from '@/types/user';

export type UserEmployerInputs = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
};
export type ManageUsersFormProps = {
  selectedUser?: User;
  handleClick: () => void;
  handleReload: () => void;
};
