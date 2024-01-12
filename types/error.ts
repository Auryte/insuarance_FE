import { FieldError } from 'react-hook-form';

export interface ServerError {
  fields?: ServerErrorField[];
  message: string;
  stack?: string;
  error?: {
    isOperational?: boolean;
    statusCode?: number;
  };
}

export type ServerErrorField = Record<'name' | 'message', string>;

export type Errors = Record<string, FieldError>;
