import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BadgeComponent,
  IconsComponent,
  PaginationComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-table-expenses',
  standalone: true,
  imports: [CommonModule, IconsComponent, BadgeComponent, PaginationComponent],
  templateUrl: './table-expenses.component.html',
  styleUrl: './table-expenses.component.scss',
})
export class TableExpensesComponent {
  headerTable: string[] = [
    'Requested For',
    'Expense Date',
    'Reference Number',
    'Description',
    'Qty',
    'Total Amount',
    'Vendor',
  ];
}
