import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageEmptyComponent } from '../../shared/page-empty/page-empty.component';
import { TableAutoGenerateComponent } from '../../shared/table-auto-generate/table-auto-generate.component';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../shared/flyout-simple/flyout-simple.component';

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
  ],
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.scss',
})
export class MasterDataComponent {
  headerTable: string[] = ['Matter', 'Type', 'Description', 'Status', ''];
  property: string[] = ['matter', 'type', 'description', 'status', ''];
  data: {
    matter: string;
    type: string;
    description: string;
    status: string;
  }[] = [
    {
      matter: '5433',
      type: 'Billable',
      description:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
      status: 'Inactive',
    },
  ];
  filterFlyout: boolean = false;

  openCloseFlyout(): void {
    this.filterFlyout = !this.filterFlyout;
  }
}
