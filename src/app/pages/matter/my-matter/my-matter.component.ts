import { Component } from '@angular/core';
import { FormSearchComponent } from './form-search/form-search.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { FilterAppliedComponent } from '../../../shared/filter-applied/filter-applied.component';
import { FilterAplliedDTO } from '../../../shared/filter-applied/filter-apllied.dto';
import { MyMatterService } from './services/my-matter.service';
import {
  ButtonIconComponent,
  FilterGroupButtonComponent,
  FilterGroupComponent,
} from '@quantum/fui';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-matter',
  standalone: true,
  imports: [
    RouterModule,
    FormSearchComponent,
    ContentCardComponent,
    FilterAppliedComponent,
    FilterGroupButtonComponent,
    FilterGroupComponent,
    ButtonIconComponent,
  ],
  templateUrl: './my-matter.component.html',
  styleUrl: './my-matter.component.scss',
})
export class MyMatterComponent {
  filterApllied: FilterAplliedDTO[] = [];

  /** Filter status */
  filterForActive: boolean = false;
  filterForPending: boolean = false;
  filterForOnHold: boolean = false;
  filterForCompleted: boolean = false;
  filterForClosed: boolean = false;

  constructor(private readonly myMatterService: MyMatterService) {}

  ngOnInit(): void {
    this.filterApllied = this.myMatterService.dataFilterMyMatter();
  }

  /** Toggle for active or deactive */
  toggleActiveFilter(param: string): void {
    if (param === 'active') {
      this.filterForActive = !this.filterForActive;
    }
    if (param === 'pending') {
      this.filterForPending = !this.filterForPending;
    }
    if (param === 'onHold') {
      this.filterForOnHold = !this.filterForOnHold;
    }
    if (param === 'completed') {
      this.filterForCompleted = !this.filterForCompleted;
    }
    if (param === 'closed') {
      this.filterForClosed = !this.filterForClosed;
    }
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
