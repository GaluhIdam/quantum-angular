import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageGenericDefaultComponent } from '../../../shared/page-generic-default/page-generic-default.component';
import {
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
  TextareaComponent,
  TextComponent,
} from '@quantum/fui';
import { EmptyDataComponent } from '../../../shared/empty-data/empty-data.component';
import { FlyoutSimpleComponent } from '../../../shared/flyout-simple/flyout-simple.component';
import { ModalDeleteComponent } from '../../../shared/modal-delete/modal-delete.component';
import { BaseController } from '../../../core/controller/basecontroller';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-matter-business-source',
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
    TextareaComponent,
    SelectFieldComponent,
  ],
  templateUrl: './matter-business-source.component.html',
  styleUrl: './matter-business-source.component.scss',
})
export class MatterBusinessSourceComponent extends BaseController {
  /** Link */
  link: BreadcrumbData[] = [
    { label: 'Administration', link: '/master-data' },
    {
      label: 'Matter Business Source',
      link: '/master-data/matter-business-source',
    },
  ];

  /** Flyout utility */
  openFlyout: boolean = false;
  createUpdate: 'create' | 'update' = 'create';

  /** Modal utility */
  openModalDelete: boolean = false;

  /** Data for table */
  dataUnit: {
    name: string;
    code: string;
    desc: string;
    basedInfo: string;
    showMatter: boolean;
    showConflict: boolean;
  }[] = [
    {
      name: 'Name',
      code: 'CCL',
      desc: 'Existing Client/Existing Client/ Directorship Contact',
      basedInfo: 'Stakeholder',
      showMatter: true,
      showConflict: false,
    },
    {
      name: 'Personal Contact',
      code: 'PCT',
      desc: 'Personal Contact',
      basedInfo: 'Person',
      showMatter: true,
      showConflict: false,
    },
    {
      name: 'Proposal/Tender',
      code: 'PCT',
      desc: 'Personal Contact',
      basedInfo: 'Person',
      showMatter: false,
      showConflict: false,
    },
  ];

  page: number = 1;
  limit: number = 10;
  totalItems: number = 100;
  title: string[] = [
    'Name',
    'Code',
    'Description',
    'Based Information',
    'Show in Matter',
    'Show in Conflict Check',
    '',
  ];

  /** Name */
  nameForm: FormControl = new FormControl('');
  /** Code */
  codeForm: FormControl = new FormControl('');
  /** Description */
  descForm: FormControl = new FormControl('');
  /** Matter status */
  statusMatter: boolean = false;
  /** Conflict status */
  statusConflict: boolean = false;

  /** Level */
  basedInfoForm: FormControl = new FormControl('');
  basedInfoOption: {
    label: string;
    value: any;
  }[] = [
    {
      label: 'Employee',
      value: 1,
    },
    {
      label: 'Stakeholder',
      value: 2,
    },
    {
      label: 'Person',
      value: 3,
    },
    {
      label: 'RTA',
      value: 4,
    },
    {
      label: 'Other',
      value: 5,
    },
  ];

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
