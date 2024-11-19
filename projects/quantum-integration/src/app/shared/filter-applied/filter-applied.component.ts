import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '@quantum/fui';
import { FilterAppliedDTO } from './filter-apllied.dto';

@Component({
  selector: 'shared-filter-applied',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './filter-applied.component.html',
  styleUrl: './filter-applied.component.scss',
})
export class FilterAppliedComponent {
  @Input({ required: true }) filterApplied: FilterAppliedDTO[] = [];
  @Output() actionOut: EventEmitter<FilterAppliedDTO[]> = new EventEmitter<
    FilterAppliedDTO[]
  >();

  /** Clear Filter All */
  clearAllFilter(): void {
    this.filterApplied = [];
    this.actionOut.emit(this.filterApplied);
  }

  /** Clear Filter Per Item */
  clearFilterPerItem(item: FilterAppliedDTO): void {
    this.filterApplied = this.filterApplied.filter((i) => i.name !== item.name);
    this.actionOut.emit(this.filterApplied);
  }

  /** Checking filter is on or not */
  checkFilter(): boolean {
    return this.filterApplied.some((item) => item.status == true);
  }
}
