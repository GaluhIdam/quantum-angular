import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormSearchComponent } from '../my-matter/form-search/form-search.component';
import { ButtonIconComponent } from '@quantum/fui';
import { FilterAppliedComponent } from '../../../shared/filter-applied/filter-applied.component';
import { FilterAplliedDTO } from '../../../shared/filter-applied/filter-apllied.dto';
import { CardAllMatterComponent } from './card-all-matter/card-all-matter.component';

@Component({
  selector: 'app-all-matter',
  standalone: true,
  imports: [
    CommonModule,
    FormSearchComponent,
    ButtonIconComponent,
    FilterAppliedComponent,
    CardAllMatterComponent,
  ],
  templateUrl: './all-matter.component.html',
  styleUrl: './all-matter.component.scss',
})
export class AllMatterComponent {
  filterApllied: FilterAplliedDTO[] = [];

  ngOnInit(): void {
    this.filterApllied = [
      {
        name: 'Date',
        status: true,
      },
      {
        name: 'Description',
        status: true,
      },
      {
        name: 'Filter Type Badges',
        status: true,
      },
      {
        name: 'Filter Type Badges',
        status: true,
      },
      {
        name: 'Filter Type Badges',
        status: true,
      },
      {
        name: 'Filter Type Badges',
        status: true,
      },
      {
        name: 'Filter Type Badges',
        status: true,
      },
      {
        name: 'Filter Type Badges',
        status: true,
      },
    ];
  }

  /** Clear All Filter */
  clearAllFilterOut(event: FilterAplliedDTO[]): void {
    this.filterApllied = event;
  }
  /** Clear Filter per Item */
  clearFilterPerItemOut(event: FilterAplliedDTO[]): void {
    this.filterApllied = event;
  }
}
