export interface MyMatterDTO {
  idMatter: number;
  matter: string;
  description: string;
  country: CountryDTO[];
  subDescription: string;
  partnerInCharge: string | null;
  unbilled: number | null;
  uncollected: number | null;
  budget: number | null;
  status: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  updatedAt: string;
}

export interface CountryDTO {
  idCountry: number;
  country: string;
  createdAt: string;
  updatedAt: string;
}

/** Billability */
export interface BillabilityDTO {
  idBillability: number;
  billability: string;
  createdAt: string;
  updatedAt: string;
}

/** PG TO PA */
export interface PracticeGroupDTO {
  idPracticeGroup: number;
  practiceGroup: string;
  practiceArea: PracticeAreaDTO[];
  createdAt: string;
  updatedAt: string;
}
export interface PracticeAreaDTO {
  idPracticeArea: number;
  practiceArea: string;
  createdAt: string;
  updatedAt: string;
}

/** Matters */
export interface MatterTypeDTO {
  idMatterType: number;
  matterType: string;
  createdAt: string;
  updatedAt: string;
}
export interface MatterStatusDTO {
  idMatterStatus: number;
  matterStatus: string;
  createdAt: string;
  updatedAt: string;
}

/** Fee structure */
export interface FeeStructureDTO {
  idFeeStructure: number;
  feeStructure: string;
  createdAt: string;
  updatedAt: string;
}

/** PIC */
export interface PersonInChargeDTO {
  idPic: number;
  pic: string;
  createdAt: string;
  updatedAt: string;
}

/** Matter member */
export interface MatterMemberDTO {
  idMatterMember: number;
  matterMember: string;
  createdAt: string;
  updatedAt: string;
}
