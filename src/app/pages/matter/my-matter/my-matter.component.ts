import { Component } from '@angular/core';
import { ContentCardComponent } from './content-card/content-card.component';
import { FilterAppliedComponent } from '../../../shared/filter-applied/filter-applied.component';
import { FilterAppliedDTO } from '../../../shared/filter-applied/filter-apllied.dto';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
} from '@quantum/fui';
import { RouterModule } from '@angular/router';
import { ButtonGroupComponent } from '../../../shared/button-group/button-group.component';
import { FlyoutFilterMatterComponent } from '../../../shared/flyout-filter-matter/flyout-filter-matter.component';
import { SkeletonComponent } from '../../../shared/skeleton/skeleton.component';
import { PageEmptyComponent } from '../../../shared/page-empty/page-empty.component';
import { BaseController } from '../../../core/controller/basecontroller';

@Component({
  selector: 'app-my-matter',
  standalone: true,
  imports: [
    RouterModule,
    ContentCardComponent,
    FilterAppliedComponent,
    ButtonIconComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonGroupComponent,
    FlyoutFilterMatterComponent,
    SkeletonComponent,
    PageEmptyComponent,
  ],
  templateUrl: './my-matter.component.html',
  styleUrl: './my-matter.component.scss',
})
export class MyMatterComponent {
  loading: boolean = false;
  /** Button filter */
  btnFilterList: {
    title: string;
    status: boolean;
    total: number | null;
  }[] = [
    {
      title: 'Active',
      status: false,
      total: 11,
    },
    {
      title: 'Pending',
      status: false,
      total: 11,
    },
    {
      title: 'On Hold',
      status: false,
      total: 11,
    },
    {
      title: 'Completed',
      status: false,
      total: 11,
    },
    {
      title: 'Closed',
      status: false,
      total: null,
    },
  ];
  filterApplied: FilterAppliedDTO[] = [];

  isOpenFlyoutFilter: boolean = false;

  ngOnInit(): void {
    // this.loading = true;
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);
  }

  /** Catch action filter button */
  actionFilterBtn(event: {
    title: string;
    status: boolean;
    total: number | null;
  }): void {
    console.log(event);
  }

  /** Open filter flyout */
  openFilterFlyout(): void {
    this.isOpenFlyoutFilter = true;
  }

  /** Catch filter action */
  actionFilter(event: boolean): void {
    this.isOpenFlyoutFilter = event;
  }

  /** Catch action from applied filter */
  actionFilterApplied(event: FilterAppliedDTO[]): void {
    this.filterApplied = event;
  }
}
