export interface MatterTypesDTO {
  practiceGroup: string;
  practiceArea: {
    name: string;
    matter: {
      matterTypeName: string;
      matterTypeCode: string;
      status: boolean;
      skills: string[];
    }[];
  }[];
}
