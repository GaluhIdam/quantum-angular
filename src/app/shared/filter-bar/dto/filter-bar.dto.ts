import { FormControl } from '@angular/forms';
import { SelectableDTO } from '@quantum/fui';

export interface FilterBarDTO {
  label: string;
  status: boolean;
  formControl: FormControl;
  placeholder?: string;
  options: SelectableDTO[];
  selected: SelectableDTO[];
  type: 'combo-box' | 'text' | 'dateRange' | 'datePicker' | 'time-selection';
}
