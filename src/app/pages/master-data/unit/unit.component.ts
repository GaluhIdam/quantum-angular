import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import {
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
  selector: 'app-unit',
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
  ],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent extends BaseController {
  /** Sort Data */
  sortData?: {
    fieldName: string;
    sort: 'asc' | 'desc' | null;
  };

  /** Link */
  link: BreadcrumbData[] = [
    { label: 'Administration', link: '/master-data' },
    { label: 'Units', link: '/master-data/units' },
  ];

  /** Flyout utility */
  openFlyout: boolean = false;
  createUpdate: 'create' | 'update' = 'create';

  /** Modal utility */
  openModalDelete: boolean = false;

  /** Data for table */
  dataUnit: { name: string; status: boolean }[] = [
    {
      name: 'Days',
      status: false,
    },
    {
      name: 'Hours',
      status: false,
    },
    {
      name: 'Kilometers',
      status: true,
    },
  ];

  page: number = 1;
  limit: number = 10;
  totalItems: number = 100;
  title: string[] = ['Name', ''];

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

  /** Toggle Sort */
  toggleSort(event: { fieldName: string; sort: 'asc' | 'desc' | null }): void {
    this.sortData = event;
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
