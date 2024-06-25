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

export interface UserKeycloakDTO {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  createdTimestamp: number;
  enabled: boolean;
  totp: boolean;
  disableableCredentialTypes: any[];
  requiredActions: any[];
  notBefore: number;
  access: Access;
}

export interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
}

export interface TokenDTO {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  'not-before-policy': number;
  scope: string;
}
