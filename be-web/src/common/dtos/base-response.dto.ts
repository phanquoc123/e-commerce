export class ConflictBase {
  field: string;
  value: unknown;
}

export interface Response<T> {
  error?: boolean;
  code?: string;
  conflicts?: ConflictBase[];
  statusCode?: number;
  message?: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export class ResponseBase {
  error?: boolean;
  code?: string;
  conflicts?: ConflictBase[];
  statusCode?: number;
  message?: string;
  data?: any;
}

export class PaginationDto extends ResponseBase {
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}
