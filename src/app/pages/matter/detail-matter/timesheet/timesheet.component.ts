import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UtilityDetailMatterComponent } from './utility-detail-matter/utility-detail-matter.component';
import { ButtonGroupComponent } from '../../../../shared/button-group/button-group.component';
import { TableAutoGenerateComponent } from '../../../../shared/table-auto-generate/table-auto-generate.component';
import { ActionBtn } from '../../../../shared/table-auto-generate/table-type';
import { TimesheetDetailDTO } from '../../../../interfaces/timesheet-detail.dto';
import {
  AdvanceFilterComponent,
  AdvanceFilterItemComponent,
  AdvanceFilterSectionComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FormControlLayoutComponent,
  InputFieldComponent,
} from '@quantum/fui';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterAppliedDTO } from '../../../../shared/filter-applied/filter-apllied.dto';
import { ModalDeleteComponent } from '../../../../shared/modal-delete/modal-delete.component';
import { FlyoutTimesheetComponent } from '../../../../shared/flyout-timesheet/flyout-timesheet.component';
import { MoveMatterComponent } from '../../../../shared/move-matter/move-matter.component';

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilityDetailMatterComponent,
    ButtonGroupComponent,
    TableAutoGenerateComponent,
    MoveMatterComponent,
    DateRangeComponent,
    ComboBoxComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ModalDeleteComponent,
    FlyoutTimesheetComponent,
    AdvanceFilterComponent,
    AdvanceFilterSectionComponent,
    AdvanceFilterItemComponent,
  ],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss',
})
export class TimesheetComponent {
  /** Button filter */
  btnFilterList: {
    title: string;
    status: boolean;
    total: number | null;
  }[] = [
    {
      title: 'Unbilled',
      status: true,
      total: 11,
    },
    {
      title: 'Billed',
      status: false,
      total: null,
    },
  ];

  /** Filter applied */
  filterApplied: FilterAppliedDTO[] = [
    {
      name: 'Date',
      status: true,
    },
    {
      name: 'Date',
      status: true,
    },
    {
      name: 'Date',
      status: true,
    },
    {
      name: 'Date',
      status: true,
    },
    {
      name: 'Date',
      status: true,
    },
    {
      name: 'Date',
      status: true,
    },
  ];

  /** Table config */
  titleTable: string[] = ['Date', 'Name', 'Description', 'Duration', 'Rate'];
  propertyTable: string[] = ['date', 'name', 'description', 'duration', 'rate'];
  dataTable: TimesheetDetailDTO[] = [
    {
      date: '27 May 24',
      name: 'Product 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ',
      duration: '2h 30m',
      rate: 'USD 300.00',
    },
    {
      date: '27 May 24',
      name: 'Product 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ',
      duration: '2h 30m',
      rate: 'USD 300.00',
    },
  ];
  action: ActionBtn[] = ['edit', 'delete'];
  limit: number = 10;
  totalItems: number = 100;

  /** Selection data */
  timesheetSelected: any[] = [];
  clearSelection: boolean = false;

  /**  Flyout */
  isOpenFlyoutCreate: boolean = false;
  isOpenFlyoutEdit: boolean = false;
  isOpenFlyoutFilter: boolean = false;
  openModalDelete: boolean = false;

  /** Form Filter */
  startDateForm: FormControl = new FormControl('');
  endDateForm: FormControl = new FormControl('');
  descriptionForm: FormControl = new FormControl('');

  nameForm: FormControl = new FormControl('');
  nameOption: {
    name: string;
    value: any;
  }[] = [];
  nameSelected: {
    name: string;
    value: any;
  }[] = [];

  writeOffStatusForm: FormControl = new FormControl();
  writeOffStatusOption: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'All',
      value: 1,
    },
    {
      name: 'No Write-off',
      value: 2,
    },
    {
      name: 'Written-off',
      value: 3,
    },
  ];
  writeOffStatusSelected: {
    name: string;
    value: any;
  }[] = [];

  billingNumberForm: FormControl = new FormControl();
  billingNumberOption: {
    name: string;
    value: any;
  }[] = [];
  billingNumberSelected: {
    name: string;
    value: any;
  }[] = [];

  /** Catch action from util */
  actionBtnUtil(event: 'update' | 'download' | 'filter' | 'create'): void {
    if (event === 'create') {
      this.isOpenFlyoutCreate = true;
    }
    if (event === 'filter') {
      this.isOpenFlyoutFilter = true;
    }
  }

  /** Clear all filter */
  clearAllFilterOut(event: FilterAppliedDTO[]): void {
    this.filterApplied = event;
  }

  /** Catch action from table */
  actionOutTable(event: { action: ActionBtn; data: any }): void {
    if (event.action === 'delete') {
      this.openModalDelete = true;
    }
    if (event.action === 'edit') {
      this.isOpenFlyoutEdit = true;
    }
  }

  /** Catch action from table */
  actionModal(event: { name: string; status: boolean }): void {
    this.openModalDelete = false;
  }

  /** Catch data selected from table and catch cleared data selected from move matter */
  onSelectedItemsChange(selectedItems: any[]): void {
    if (selectedItems.length === 0) {
      this.clearSelection = true;
    }
    this.timesheetSelected = selectedItems;
  }

  /** Catch close create flyout */
  closeOut(
    event: boolean,
    param: 'create' | 'filter' | 'edit',
    some?: boolean | 'filter' | 'clear'
  ): void {
    if (param === 'create') {
      this.isOpenFlyoutCreate = event;
    }
    if (param === 'filter') {
      if (some === 'clear') {
        this.startDateForm = new FormControl('');
        this.endDateForm = new FormControl('');
        this.nameForm = new FormControl('');
        this.nameSelected = [];
        this.descriptionForm = new FormControl('');
        this.writeOffStatusForm = new FormControl('');
        this.writeOffStatusSelected = [];
        this.billingNumberForm = new FormControl('');
        this.billingNumberSelected = [];
      }
      this.isOpenFlyoutFilter = event;
    }
    if (param === 'edit') {
      this.isOpenFlyoutEdit = event;
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

  /** Combox Selection */
  selectionCombox(
    event: { name: string; value: any }[],
    param: 'name' | 'writeoff' | 'billing'
  ): void {
    if (param === 'name') {
      this.nameSelected = event;
    }
    if (param === 'writeoff') {
      this.writeOffStatusSelected = event;
    }
    if (param === 'billing') {
      this.billingNumberSelected = event;
    }
  }

  /** Watch changes of date range */
  watchDateChange(type: 'start' | 'end', value: string): void {
    if (type === 'start') {
      this.startDateForm = new FormControl(value);
    } else {
      this.endDateForm = new FormControl(value);
    }
  }

  /** Array to string */
  getFormattedNames(
    param: {
      name: string;
      value: any;
    }[]
  ): string {
    const names = param.map((item) => item.name);

    if (names.length <= 3) {
      return names.join(', ');
    } else {
      const firstThree = names.slice(0, 3).join(', ');
      const remainingCount = names.length - 3;
      return `${firstThree}, ${remainingCount}+`;
    }
  }
}
