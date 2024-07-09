import { Component } from '@angular/core';
import { SearchFilterAddComponent } from './search-filter-add/search-filter-add.component';
import { TableExpensesComponent } from './table-expenses/table-expenses.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [SearchFilterAddComponent, TableExpensesComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {}
