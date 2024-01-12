import { Dispatch, SetStateAction } from 'react';
import { UserRole } from '@/types/user';

export interface ErrorFieldProps {
  name: string;
  message: string;
}
export interface ErrorProps {
  isOperational: boolean;
  fields: ErrorFieldProps[];
  status: number;
}

export type ErrorsProps = Record<'mongoDBErrors' | 'validationErrors', ErrorProps[]>;
export interface FileUploadInputProps {
  name: string;
  accept: string;
  supportedFiles: string;
  errorMessage: string;
  uploadCallback: any;
  setNewFile: Dispatch<SetStateAction<File[]>>;
  setFileUrl?: Dispatch<SetStateAction<string | undefined>>;
  isfile: boolean;
  setIsFileUploading: Dispatch<SetStateAction<boolean>>;
  isFileSubmitting?: boolean;
  employerId?: string;
  handleSetErrors?: (errors: ErrorsProps | null) => void;
  isFileUploading?: boolean;
  handleOpen?: () => void;
}
export interface FileData {
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  SSN?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  password?: string;
}
