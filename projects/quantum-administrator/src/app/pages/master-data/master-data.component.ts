import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageEmptyComponent } from '../../shared/page-empty/page-empty.component';
import { TableAutoGenerateComponent } from '../../shared/table-auto-generate/table-auto-generate.component';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  SelectFieldComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../shared/flyout-simple/flyout-simple.component';
import { ModalDeleteComponent } from '../../shared/modal-delete/modal-delete.component';

@Component({
  selector: 'app-master-data',
  standalone: true,
  imports: [
    CommonModule,
    PageEmptyComponent,
    TableAutoGenerateComponent,
    ButtonIconComponent,
    FlyoutSimpleComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    TextComponent,
    TableComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyDataComponent,
    TableHeadComponent,
    TextComponent,
    IconsComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ComboBoxComponent,
    SelectFieldComponent,
    ModalDeleteComponent,
  ],
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.scss',
})
export class MasterDataComponent {
  headerTable: string[] = [
    'Practice Group',
    'Practice Area',
    'Name',
    'Code',
    'Active',
    '',
  ];
  data: {
    pg: string;
    pa: string;
    name: string;
    code: string;
    status: boolean;
  }[] = [
    {
      pg: 'AHP',
      pa: '-',
      name: 'Business Development & Marketing',
      code: 'BUSD',
      status: true,
    },
    {
      pg: 'AHP',
      pa: '-',
      name: 'Knowledge & Precedent',
      code: 'PRECE',
      status: false,
    },
  ];
  filterFlyout: boolean = false;
  createFlyout: boolean = false;
  openModalDelete: boolean = false;
  titleFlyout: string = '';

  openCloseFlyout(param: 'filter' | 'create' | 'edit' | 'delete'): void {
    if (param === 'filter') {
      this.filterFlyout = !this.filterFlyout;
    }
    if (param === 'create') {
      this.titleFlyout = 'Create Matter Type';
      this.createFlyout = !this.createFlyout;
    }
    if (param === 'edit') {
      this.titleFlyout = 'Edit Matter Type';
      this.createFlyout = !this.createFlyout;
    }
    if (param === 'delete') {
      this.openModalDelete = !this.openModalDelete;
    }
  }
}
