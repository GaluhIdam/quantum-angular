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
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
} from '@quantum/fui';
import { RouterModule } from '@angular/router';
import { ButtonGroupComponent } from '../../../shared/button-group/button-group.component';
import { FilterMatterFlyoutComponent } from '../../../shared/filter-matter-flyout/filter-matter-flyout.component';

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
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonGroupComponent,
    FilterMatterFlyoutComponent,
  ],
  templateUrl: './my-matter.component.html',
  styleUrl: './my-matter.component.scss',
})
export class MyMatterComponent {
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
  filterApllied: FilterAplliedDTO[] = [];

  isOpenFlyoutFilter: boolean = false;

  constructor(private readonly myMatterService: MyMatterService) {}

  ngOnInit(): void {
    this.filterApllied = this.myMatterService.dataFilterMyMatter();
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
  actionFilterApplied(event: FilterAplliedDTO[]): void {
    this.filterApllied = event;
  }
}
