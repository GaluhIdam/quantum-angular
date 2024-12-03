import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbData,
  TextComponent,
} from '@quantum/fui';
import { FilterAppliedComponent } from '../filter-applied/filter-applied.component';
import { FilterAppliedDTO } from '../filter-applied/filter-apllied.dto';
import { ButtonGroupComponent } from '../button-group/button-group.component';

@Component({
  selector: 'shared-page-generic-default',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    BreadcrumbComponent,
    FilterAppliedComponent,
    ButtonGroupComponent,
  ],
  templateUrl: './page-generic-default.component.html',
  styleUrl: './page-generic-default.component.scss',
})
export class PageGenericDefaultComponent {
  @Input({ required: true }) title: string = 'Page Title';
  @Input() description?: string;
  @Input() breadcrums: BreadcrumbData[] = [];
  @Input() filterApplied: FilterAppliedDTO[] = [];
  @Input() filterGroup: {
    title: string;
    status: boolean;
    total: number | null;
  }[] = [];

  /** update filter group */
  filterGroupAct(event: {
    title: string;
    status: boolean;
    total: number | null;
  }): void {
    console.log(event);
  }

  /** Update filter applied */
  filterAppliedAct(event: FilterAppliedDTO[]): void {
    this.filterApplied = event;
  }
}
