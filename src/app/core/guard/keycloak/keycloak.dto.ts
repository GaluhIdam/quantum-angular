export interface UserKeycloak {
  sub: string;
  upn: string;
  address: Address;
  email_verified: boolean;
  name: string;
  groups: string[];
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface Address {}
