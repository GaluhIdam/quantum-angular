import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import {
  BadgeComponent,
  BreadcrumbData,
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TableDataTreeComponent,
  TableHeadTreeComponent,
  TableRowTreeComponent,
  TableTreeComponent,
  TextComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../shared/empty-data/empty-data.component';
import { FlyoutSimpleComponent } from '../../../shared/flyout-simple/flyout-simple.component';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { BaseController } from '../../../core/controller/basecontroller';
@Component({
  selector: 'app-timesheet-activity-description',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PageGenericDefaultComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    TableTreeComponent,
    TableHeadTreeComponent,
    TableRowTreeComponent,
    TableDataTreeComponent,
    TextComponent,
    EmptyDataComponent,
    FlyoutSimpleComponent,
    ModalDeleteComponent,
    BadgeComponent,
  ],
  templateUrl: './timesheet-activity-description.component.html',
  styleUrl: './timesheet-activity-description.component.scss',
})
export class TimesheetActivityDescriptionComponent extends BaseController {
  /** Link */
  link: BreadcrumbData[] = [
    { label: 'Administration', link: '/master-data' },
    {
      label: 'Timesheet Activity Description',
      link: '/master-data/timesheet-activity-description',
    },
  ];

  /** Filter Group */
  filterGroup: {
    title: string;
    status: boolean;
    total: number | null;
  }[] = [
    { title: 'A', status: false, total: null },
    { title: 'B', status: false, total: null },
    { title: 'C', status: false, total: null },
    { title: 'D', status: false, total: null },
    { title: 'E', status: false, total: null },
    { title: 'F', status: false, total: null },
    { title: 'G', status: false, total: null },
    { title: 'H', status: false, total: null },
    { title: 'I', status: false, total: null },
    { title: 'J', status: false, total: null },
    { title: 'K', status: false, total: null },
    { title: 'L', status: false, total: null },
    { title: 'M', status: false, total: null },
    { title: 'N', status: false, total: null },
    { title: 'O', status: false, total: null },
    { title: 'P', status: false, total: null },
    { title: 'Q', status: false, total: null },
    { title: 'R', status: false, total: null },
    { title: 'S', status: false, total: null },
    { title: 'T', status: false, total: null },
    { title: 'U', status: false, total: null },
    { title: 'V', status: false, total: null },
    { title: 'W', status: false, total: null },
    { title: 'X', status: false, total: null },
    { title: 'Y', status: false, total: null },
    { title: 'Z', status: false, total: null },
  ];

  /** Flyout utility */
  openFlyout: boolean = false;
  createUpdate: 'create' | 'update' = 'create';

  /** Modal utility */
  openModalDelete: boolean = false;

  /** Data for table */
  dataUnit: { desc: string; status: boolean }[] = [
    {
      desc: 'Accompany',
      status: false,
    },
    {
      desc: 'Accompanying',
      status: false,
    },
    {
      desc: 'Analyse',
      status: true,
    },
    {
      desc: 'Analysing',
      status: false,
    },
  ];

  page: number = 1;
  limit: number = 10;
  totalItems: number = 100;
  title: string[] = ['Description', 'Status', ''];

  /** Name */
  nameForm: FormControl = new FormControl('');
  /** Default status */
  statusDefault: boolean = false;

  /** Observe table pagination */
  onPageChanges(event: { page: number; itemsPerPage: number }): void {
    this.page = event.page;
    this.limit = event.itemsPerPage;
  }

  /** Toggle open flyout */
  toggleOpenFlyout(param: 'create' | 'update', status: boolean): void {
    this.openFlyout = status;
    this.createUpdate = param;
  }

  /** Toggle modal delete */
  toggleModalDelete(event: { name: string; status: boolean }): void {
    this.openModalDelete = event.status;
    if (event.name === 'delete') {
      this.toggleToast(
        'success',
        'Success',
        'check',
        'Data deleted successfully.',
        'sizem'
      );
    }
  }

  /** Toggle update/create data */
  toggleUpdateCreateData(
    param: 'create' | 'update' | null,
    status: boolean
  ): void {
    this.openFlyout = status;
    if (param === 'create') {
      this.toggleToast(
        'success',
        'Success',
        'check',
        'Data created successfully.',
        'sizem'
      );
    }
    if (param === 'update') {
      this.toggleToast(
        'success',
        'Success',
        'check',
        'Data updated successfully.',
        'sizem'
      );
    }
  }
}
