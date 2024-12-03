import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
} from '@quantum/fui';
import { FilterAppliedDTO } from '../../../shared/filter-applied/filter-apllied.dto';
import { CardAllMatterComponent } from './card-all-matter/card-all-matter.component';
import { FlyoutFilterMatterComponent } from '../../../shared/flyout-filter-matter/flyout-filter-matter.component';
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';

@Component({
  selector: 'app-all-matter',
  standalone: true,
  imports: [
    CommonModule,
    ButtonIconComponent,
    CardAllMatterComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    FlyoutFilterMatterComponent,
    PageEmptyComponent,
  ],
  templateUrl: './all-matter.component.html',
  styleUrl: './all-matter.component.scss',
})
export class AllMatterComponent {
  filterApplied: FilterAppliedDTO[] = [];

  ngOnInit(): void {
    this.filterApplied = [
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

  /**  Flyout */
  isOpenFlyoutCreate: boolean = false;
  isOpenFlyoutFilter: boolean = false;

  /** Catch action from util */
  actionBtnUtil(event: 'filter' | 'create'): void {
    if (event === 'create') {
      this.isOpenFlyoutCreate = true;
    }
    if (event === 'filter') {
      this.isOpenFlyoutFilter = !this.isOpenFlyoutFilter;
    }
  }

  /** Catch action from flyout */
  closeOut(event: boolean, param: 'filter' | 'create'): void {
    if (param === 'filter') {
      this.isOpenFlyoutFilter = event;
    }
  }

  /** Clear All Filter */
  clearAllFilterOut(event: FilterAppliedDTO[]): void {
    this.filterApplied = event;
  }
  /** Clear Filter per Item */
  clearFilterPerItemOut(event: FilterAppliedDTO[]): void {
    this.filterApplied = event;
  }
}
