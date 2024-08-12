import { Component } from '@angular/core';
import { TableExpensesComponent } from './table-expenses/table-expenses.component';
import { CommonModule } from '@angular/common';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableExpensesComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    FlyoutSimpleComponent,
    TextComponent,
    ComboBoxComponent,
    DateRangeComponent,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  /**  Flyout */
  isOpenFlyoutCreate: boolean = false;
  isOpenFlyoutFilter: boolean = false;

  /** Form Filter */
  requestForm: FormControl = new FormControl('');
  requestOption: {
    name: string;
    value: any;
  }[] = [];
  requestSelected: {
    name: string;
    value: any;
  }[] = [];

  itemCatForm: FormControl = new FormControl('');
  itemCatOption: {
    name: string;
    value: any;
  }[] = [];
  itemCatSelected: {
    name: string;
    value: any;
  }[] = [];

  startDateForm: FormControl = new FormControl();
  endDateForm: FormControl = new FormControl();
  vendorINForm: FormControl = new FormControl();
  paymentNumberForm: FormControl = new FormControl();
  minAmountForm: FormControl = new FormControl();
  maxAmountForm: FormControl = new FormControl();

  collectionStatusForm: FormControl = new FormControl('');
  collectionStatusOption: {
    name: string;
    value: any;
  }[] = [];
  collectionStatusSelected: {
    name: string;
    value: any;
  }[] = [];

  collectedInForm: FormControl = new FormControl('');
  collectedInOption: {
    name: string;
    value: any;
  }[] = [];
  collectedInSelected: {
    name: string;
    value: any;
  }[] = [];

  /** Catch action from util */
  actionBtnUtil(event: 'filter' | 'create'): void {
    if (event === 'create') {
      this.isOpenFlyoutCreate = true;
    }
    if (event === 'filter') {
      this.isOpenFlyoutFilter = true;
    }
  }

  /** Catch close create flyout */
  closeOut(event: boolean, param: 'create' | 'filter'): void {
    if (param === 'create') {
      this.isOpenFlyoutCreate = event;
    }
    if (param === 'filter') {
      this.isOpenFlyoutFilter = event;
    }
  }

  /** Combox Selection */
  selectionCombox(
    event: { name: string; value: any }[],
    param: 'requested' | 'itemCat' | 'collection' | 'collected'
  ): void {
    if (param === 'requested') {
      this.requestSelected = event;
    }
    if (param === 'itemCat') {
      this.itemCatSelected = event;
    }
    if (param === 'collection') {
      this.collectionStatusSelected = event;
    }
    if (param === 'collected') {
      this.collectedInSelected = event;
    }
  }

  /** Observe for startDate changes */
  changeDateForm(event: string, param: 'start' | 'end'): void {
    if (param === 'start') {
      this.startDateForm.setValue(event);
    }
    if (param === 'end') {
      this.endDateForm.setValue(event);
    }
  }

  /** Invalid if start date is less than end date */
  invalidStartEndDate(): boolean {
    const startDateValue = this.startDateForm.value;
    const endDateValue = this.endDateForm.value;

    if (!startDateValue || !endDateValue) {
      return false;
    }

    const [startDay, startMonth, startYear] = startDateValue.split('-');
    const [endDay, endMonth, endYear] = endDateValue.split('-');
    const startDate = new Date(+startYear, +startMonth - 1, +startDay);
    const endDate = new Date(+endYear, +endMonth - 1, +endDay);

    return startDate >= endDate;
  }
}
