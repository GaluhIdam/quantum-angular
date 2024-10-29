import { Component } from '@angular/core';
import { BaseController } from '../../../core/controller/basecontroller';
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
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
  ToastComponent,
  TooltipComponent,
} from '@quantum/fui';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import { EmptyDataComponent } from '../../../shared/empty-data/empty-data.component';
import { FlyoutSimpleComponent } from '../../../shared/flyout-simple/flyout-simple.component';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { MatterTypesDTO } from './dto/matter-types.dto';

@Component({
  selector: 'app-matter-types',
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
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
    TextComponent,
    PopoverComponent,
    BadgeComponent,
    EmptyDataComponent,
    FlyoutSimpleComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    InputFieldComponent,
    ModalDeleteComponent,
    ToastComponent,
    TooltipComponent,
    AdvanceFilterComponent,
    AdvanceFilterSectionComponent,
    AdvanceFilterItemComponent,
    ComboBoxComponent,
  ],
  templateUrl: './matter-types.component.html',
  styleUrl: './matter-types.component.scss',
})
export class MatterTypesComponent extends BaseController {
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
    { label: 'Matter Type', link: '/master-data/matter-type' },
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
  dataMatterTypes: MatterTypesDTO[] = [
    {
      practiceGroup: 'Banking and Finance	',
      practiceArea: [
        {
          name: 'Financial Technology',
          matter: [
            {
              matterTypeName: 'Construction Financing',
              matterTypeCode: 'FT-CF',
              status: true,
              skills: [
                'General knowledge and understanding on accounting terms & principles',
                'General knowledge and understanding on accounting terms & principles',
                'General knowledge and understanding on accounting terms & principles',
              ],
            },
          ],
        },
      ],
    },
  ];
  showHideRow: {
    status: boolean;
    child: {
      status: boolean[];
    };
  }[] = [];

  page: number = 1;
  limit: number = 10;
  totalItems: number = 100;
  title: string[] = ['Name', 'Code', 'Type', 'Status', ''];

  /** Practice Group */
  pgForm: FormControl = new FormControl('');
  selectOptionPG: {
    label: string;
    value: any;
  }[] = [];
  /** Practice Area */
  paForm: FormControl = new FormControl('');
  selectOptionPA: {
    label: string;
    value: any;
  }[] = [];
  statusMatter: boolean = false;
  haveAssocited: boolean = false;
  showAppraisal: boolean = false;

  /** Skilss */
  skillsForm: FormControl = new FormControl('');
  selectOptionSkills: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Basic knowledge of financial analysis and reporting standards',
      value: 'Basic knowledge of financial analysis and reporting standards',
    },
    {
      label: 'Understanding of supply chain and inventory management concepts',
      value: 'Understanding of supply chain and inventory management concepts',
    },
    {
      label: 'Familiarity with project management methodologies and tools',
      value: 'Familiarity with project management methodologies and tools',
    },
    {
      label: 'Knowledge of data analysis techniques and statistical concepts',
      value: 'Knowledge of data analysis techniques and statistical concepts',
    },
  ];
  selectedSkills: string[] = [];

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

  totalFilter: number = 0;

  ngOnInit(): void {
    if (this.dataMatterTypes.length > 0) {
      this.dataMatterTypes.forEach((practiceArea) => {
        const provinceStatuses = practiceArea.practiceArea.map(() => false);

        this.showHideRow.push({
          status: false,
          child: {
            status: provinceStatuses,
          },
        });
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
