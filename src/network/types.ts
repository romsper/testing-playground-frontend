export type APIResponse = {
    status?: number;
    message?: string;
    code?: number;
    reason?: string;
  }

export type ErrorResponse = {
    code: number | undefined;
    reason: string | undefined;
  };