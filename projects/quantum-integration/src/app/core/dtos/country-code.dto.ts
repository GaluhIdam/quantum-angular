export interface CountryCodeDTO {
  flags: Flags;
  name: Name;
  cca2: string;
  idd: Idd;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common: string;
  official: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}
