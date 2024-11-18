import { Component } from '@angular/core';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import {
  BadgeComponent,
  BreadcrumbData,
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  SelectFieldComponent,
  TableDataTreeComponent,
  TableHeadTreeComponent,
  TableRowTreeComponent,
  TableTreeComponent,
  TableTreeDTO,
  TextComponent,
  ToastComponent,
} from '@quantum/fui';
import { LocationDTO } from '../../../interfaces/location.dto';
import { CommonModule } from '@angular/common';
import { EmptyDataComponent } from '../../../shared/empty-data/empty-data.component';
import { FlyoutSimpleComponent } from '../../../shared/flyout-simple/flyout-simple.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { BaseController } from '../../../core/controller/basecontroller';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    BadgeComponent,
    EmptyDataComponent,
    FlyoutSimpleComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    InputFieldComponent,
    ModalDeleteComponent,
    ToastComponent,
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent extends BaseController {
  /** Sort Data */
  sortData?: {
    fieldName: string;
    sort: 'asc' | 'desc' | null;
  };

  /** Flyout utility */
  openFlyout: boolean = false;
  createUpdate: 'create' | 'update' = 'create';

  /** Modal utility */
  openModalDelete: boolean = false;

  /** Link */
  link: BreadcrumbData[] = [
    { label: 'Administration', link: '/master-data' },
    { label: 'Location', link: '/master-data/location' },
  ];

  /** Data location for table */
  dataLocation: LocationDTO[] = [
    {
      location: 'Singapore',
      type: 'Country',
      child: [],
    },
    {
      location: 'Indonesia',
      type: 'Country',
      child: [
        {
          location: 'Aceh',
          type: 'Province',
          child: [
            {
              location: 'Badung',
              type: 'City',
              child: [],
            },
            {
              location: 'Bangli',
              type: 'City',
              child: [],
            },
            {
              location: 'Buleleng',
              type: 'City',
              child: [],
            },
          ],
        },
      ],
    },
  ];
  dataShowHide: TableTreeDTO[] = [];

  page: number = 1;
  limit: number = 10;
  totalItems: number = 100;
  title: string[] = ['Name', 'Location Type', ''];

  locationForm: FormControl = new FormControl('');
  selectOption: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Country',
      value: 'Country',
    },
    {
      label: 'Province',
      value: 'Province',
    },
    {
      label: 'City',
      value: 'City',
    },
  ];

  /** Country Option */
  countryForm: FormControl = new FormControl('');
  countryOption: {
    label: string;
    value: any;
  }[] = [];

  /** City Option */
  provinceForm: FormControl = new FormControl('');
  provinceOption: {
    label: string;
    value: any;
  }[] = [];

  ngOnInit(): void {
    this.initStatusShowHide();
  }

  /** Initial status show/hide per row */
  initStatusShowHide(): void {
    if (this.dataLocation.length > 0) {
      this.dataLocation.forEach((item, i) => {
        this.dataShowHide.push({
          status: false,
          child: [],
        });
        item.child.forEach(() =>
          this.dataShowHide[i].child.push({
            status: false,
            child: [],
          })
        );
      });
    }
  }

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
  toggleUpdateCreateData(param: 'create' | 'update', status: boolean): void {
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

  /** Toggle Sort */
  toggleSort(event: { fieldName: string; sort: 'asc' | 'desc' | null }): void {
    this.sortData = event;
  }
}
