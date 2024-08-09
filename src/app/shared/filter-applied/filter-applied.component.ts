import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '@quantum/fui';
import { FilterAplliedDTO } from './filter-apllied.dto';

@Component({
  selector: 'shared-filter-applied',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './filter-applied.component.html',
  styleUrl: './filter-applied.component.scss',
})
export class FilterAppliedComponent {
  @Input({ required: true }) filterApllied: FilterAplliedDTO[] = [];
  @Output() action: EventEmitter<FilterAplliedDTO[]> = new EventEmitter<
    FilterAplliedDTO[]
  >();

  /** Clear Filter All */
  clearAllFilter(): void {
    this.filterApllied.forEach((item) => (item.status = false));
    this.action.emit(this.filterApllied);
  }

  /** Clear Filter Per Item */
  clearFilterPerItem(item: FilterAplliedDTO): void {
    this.filterApllied.forEach((items) => {
      if (items === item) {
        items.status = false;
      }
    });
    this.action.emit(this.filterApllied);
  }

  /** Checking filter is on or not */
  checkFilter(): boolean {
    return this.filterApllied.some((item) => item.status == true);
  }
}
