export interface PaginationDTO<T> {
  data: T;
  page: number;
  limit: number;
  totalItems: number;
}
