export interface IndustrySectorDTO {
  name: string;
  category: CategoryIndustryDTO[];
}

export interface CategoryIndustryDTO {
  name: string;
  industry: IndustryDTO[];
}

export interface IndustryDTO {
  name: string;
  code: string;
  status: boolean;
}
