/** Format Response data from rest api
 * @property status: string (for status code)
 * @property message: string (for description from rest api)
 * @property result: T (data from rest api)
 */
export interface ResponseDTO<T> {
  status: string;
  message: string;
  result: T;
}

/** DTO for pagination */
export interface Result<T> {
  content: T;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
