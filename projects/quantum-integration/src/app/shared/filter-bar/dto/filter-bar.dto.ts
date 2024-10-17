import { FormControl } from '@angular/forms';
import { SelectableDTO } from '@quantum/fui';

export interface FilterBarDTO {
  formControlWhere: FormControl;
  optionsWhere: {
    name: string;
    value: any;
  }[];
  selectedWhere: {
    name: string;
    value: any;
  }[];

  formControlColumn: FormControl;
  optionsColumn: {
    name: string;
    value: any;
  }[];
  selectedColumn: {
    name: string;
    value: any;
  }[];

  formControlCondition: FormControl;
  optionsCondition: {
    name: string;
    value: any;
  }[];
  selectedCondition: {
    name: string;
    value: any;
  }[];

  formControlValue: FormControl;
  optionsValue: {
    name: string;
    value: any;
  }[];
  selectedValue: {
    name: string;
    value: any;
  }[];

  typeForm: 'combo-box' | 'text' | 'datePicker' | 'time-selection';
}

export interface OutputFilterBar {
  where: string;
  column: string;
  condition: string;
  value: string;
}
