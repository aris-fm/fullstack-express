export interface BaseGetRequest {
  offset?: string;
  limit?: string;
}

export interface WithPagination<T> {
  count: number;
  rows: T[];
}
