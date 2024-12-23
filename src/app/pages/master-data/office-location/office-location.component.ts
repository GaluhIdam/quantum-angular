import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import {
  BreadcrumbData,
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  PopoverComponent,
  TableDataTreeComponent,
  TableHeadTreeComponent,
  TableRowTreeComponent,
  TableTreeComponent,
  TextComponent,
  ToastComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../shared/empty-data/empty-data.component';
import { FlyoutSimpleComponent } from '../../../shared/flyout-simple/flyout-simple.component';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { BaseController } from '../../../core/controller/basecontroller';
import { OfficeLocationDTO } from '../../../interfaces/office-location.dto';
import { LocationDTO } from '../../../interfaces/location.dto';

@Component({
  selector: 'app-office-location',
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
    PopoverComponent,
    EmptyDataComponent,
    FlyoutSimpleComponent,
    ModalDeleteComponent,
    ToastComponent,
    PopoverComponent,
  ],
  templateUrl: './office-location.component.html',
  styleUrl: './office-location.component.scss',
})
export class OfficeLocationComponent extends BaseController {
  /** Sort Data */
  sortData?: {
    fieldName: string;
    sort: 'asc' | 'desc' | null;
  };

  /** Link */
  link: BreadcrumbData[] = [
    { label: 'Administration', link: '/master-data' },
    { label: 'Office Location', link: '/master-data/office-location' },
  ];

  /** Flyout utility */
  openFlyout: boolean = false;
  createUpdate: 'create' | 'update' = 'create';

  /** Modal utility */
  openModalDelete: boolean = false;

  /** Office Form Name */
  officeForm: FormControl = new FormControl('');

  /** Location Form Name */
  locationForm: FormControl = new FormControl('');

  /** Data for table */
  dataOfficeLocation: OfficeLocationDTO[] = [
    {
      name: 'AHP Jakarta',
      code: 'Jakarta',
    },
    {
      name: 'AHP Surabaya',
      code: 'Surabaya',
    },
  ];

  page: number = 1;
  limit: number = 10;
  totalItems: number = 100;
  title: string[] = ['Name', 'Code', ''];

  location?: string;
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
        // {
        //   location: 'Aceh',
        //   type: 'Province',
        //   child: [
        //     {
        //       location: 'Badung',
        //       type: 'City',
        //       child: [],
        //     },
        //     {
        //       location: 'Bangli',
        //       type: 'City',
        //       child: [],
        //     },
        //     {
        //       location: 'Buleleng',
        //       type: 'City',
        //       child: [],
        //     },
        //   ],
        // },
      ],
    },
  ];
  dataLocationSub: LocationDTO[] = [];
  level: number = 1;

  ngOnInit(): void {
    this.dataLocationSub = this.dataLocation;
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

  /** Toggle Location */
  selectionLocation(param: LocationDTO[], location: string): void {
    this.dataLocationSub = param;
    this.location = location;
    this.level++;
  }
  backLocation(): void {
    if (this.level > 1) this.level--;
    if (this.level === 1) this.dataLocationSub = this.dataLocation;
  }
}
