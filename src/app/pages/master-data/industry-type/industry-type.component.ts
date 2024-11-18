import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import {
  AdvanceFilterComponent,
  AdvanceFilterItemComponent,
  AdvanceFilterSectionComponent,
  BadgeComponent,
  BreadcrumbData,
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  PopoverComponent,
  SelectFieldComponent,
  TableDataTreeComponent,
  TableHeadTreeComponent,
  TableRowTreeComponent,
  TableTreeComponent,
  TableTreeDTO,
  TextComponent,
  ToastComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../shared/empty-data/empty-data.component';
import { FlyoutSimpleComponent } from '../../../shared/flyout-simple/flyout-simple.component';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { BaseController } from '../../../core/controller/basecontroller';
import { IndustrySectorDTO } from '../../../interfaces/industry-type.dto';

@Component({
  selector: 'app-industry-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageGenericDefaultComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    SelectFieldComponent,
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
    ModalDeleteComponent,
    ToastComponent,
    AdvanceFilterComponent,
    AdvanceFilterSectionComponent,
    AdvanceFilterItemComponent,
    ComboBoxComponent,
    PopoverComponent,
  ],
  templateUrl: './industry-type.component.html',
  styleUrl: './industry-type.component.scss',
})
export class IndustryTypeComponent extends BaseController {
  /** Sort Data */
  sortData?: {
    fieldName: string;
    sort: 'asc' | 'desc' | null;
  };

  /** Flyout utility */
  openFlyout: boolean = false;
  createUpdate: 'create' | 'update' = 'create';

  /** Open Filter */
  openFilter: boolean = false;

  /** Modal utility */
  openModalDelete: boolean = false;

  /** Link */
  link: BreadcrumbData[] = [
    { label: 'Administration', link: '/master-data' },
    { label: 'Industry Types', link: '/master-data/industry-type' },
  ];

  /** Filter Group */
  filterGroup: {
    title: string;
    status: boolean;
    total: number | null;
  }[] = [
    {
      title: 'All',
      status: true,
      total: 11,
    },
    {
      title: 'Active',
      status: false,
      total: 11,
    },
    {
      title: 'Inactive',
      status: false,
      total: 11,
    },
  ];

  /** Data location for table */
  dataIndustry: IndustrySectorDTO[] = [
    {
      name: 'Agriculture',
      category: [
        {
          name: 'Animal Husbandry	',
          industry: [
            {
              name: 'Crops',
              code: 'FT-CF',
              status: true,
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
  title: string[] = ['Name', 'Code', 'Type', 'Status', ''];
  totalFilter: number = 0;

  /** Parent Type Form */
  parentTypeForm: FormControl = new FormControl('');

  /** Name Form */
  nameForm: FormControl = new FormControl('');

  /** Code Form */
  codeForm: FormControl = new FormControl('');

  /** Option PG */
  optionValuePg: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'Corporate Solutions Inc.',
      value: 'Corporate Solutions Inc.',
    },
    {
      name: 'Global Ventures LLC',
      value: 'Global Ventures LLC',
    },
    {
      name: 'Innovative Dynamics Ltd.',
      value: 'Innovative Dynamics Ltd.',
    },
    {
      name: 'Synergy Partners Co.',
      value: 'Synergy Partners Co.',
    },
    {
      name: 'Pioneer Enterprises',
      value: 'Pioneer Enterprises',
    },
  ];

  selectedValuePg: {
    name: string;
    value: any;
  }[] = [];

  /** Option Pa */
  optionValuePa: {
    name: string;
    value: any;
  }[] = [
    {
      name: 'Corporate Solutions Inc.',
      value: 'Corporate Solutions Inc.',
    },
    {
      name: 'Global Ventures LLC',
      value: 'Global Ventures LLC',
    },
    {
      name: 'Innovative Dynamics Ltd.',
      value: 'Innovative Dynamics Ltd.',
    },
    {
      name: 'Synergy Partners Co.',
      value: 'Synergy Partners Co.',
    },
    {
      name: 'Pioneer Enterprises',
      value: 'Pioneer Enterprises',
    },
  ];
  selectedValuePa: {
    name: string;
    value: any;
  }[] = [];

  /** Option Available in Appraisals */
  aiaForm: FormControl = new FormControl('');
  optionValueAIA: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'TRUE',
      value: 'TRUE',
    },
    {
      label: 'FALSE',
      value: 'FALSE',
    },
  ];

  dataLocationSub: unknown[] = [];
  industryType?: string;
  level: number = 1;

  ngOnInit(): void {
    if (this.dataIndustry.length > 0) {
      if (this.dataIndustry.length > 0) {
        this.dataIndustry.forEach((item, i) => {
          this.dataShowHide.push({
            status: false,
            child: [],
          });
          item.category.forEach(() =>
            this.dataShowHide[i].child.push({
              status: false,
              child: [],
            })
          );
        });
      }
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

  /** Observe adv filter ouput */
  actionOut(event: boolean | 'filter' | 'clear'): void {
    this.totalFilter = 0;
    if (event === true || event === false) {
      this.openFilter = event;
    }
    if (event === 'clear') {
      this.selectedValuePg = [];
      this.selectedValuePa = [];
      this.aiaForm = new FormControl('');
    }
    if (event === 'filter') {
      if (this.selectedValuePg.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.selectedValuePa.length > 0) {
        this.totalFilter = this.totalFilter + 1;
      }
      if (this.aiaForm.value || this.aiaForm.value !== '') {
        this.totalFilter = this.totalFilter + 1;
      }
      this.openFilter = false;
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

  /** Obeserve combo box */
  catchChange(event: any, param: 'pg' | 'pa'): void {
    if (param === 'pg') {
      this.selectedValuePg = event;
    } else {
      this.selectedValuePa = event;
    }
  }

}
