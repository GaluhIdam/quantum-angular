import { FormControl } from '@angular/forms';

export interface FilterBarDTO {
  label: string;
  formControl: FormControl;
  options: { name: string; value: any }[];
  selected: { name: string; value: any }[];
}
