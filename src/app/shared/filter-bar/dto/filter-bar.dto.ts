import { FormControl } from '@angular/forms';
import { SelectableDTO } from '@quantum/fui';

export interface FilterBarDTO {
  label: string;
  status: boolean;
  formControl: FormControl;
  options: SelectableDTO[];
  selected: SelectableDTO[];
}
