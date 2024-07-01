import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '@quantum/fui';

@Component({
  selector: 'app-apply-filter',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './apply-filter.component.html',
  styleUrl: './apply-filter.component.scss',
})
export class ApplyFilterComponent {
  /** Data will input from HistoryActivityComponent */
  @Input() filterDate: boolean = false;
  @Input() filterMatter: boolean = false;
  @Input() filterTimeDescription: boolean = false;

  /** Data will output to HistoryActivityComponent */
  @Output() clearFilterAll: EventEmitter<{
    filterDate: boolean;
    filterMatter: boolean;
    filterTimeDescription: boolean;
  }> = new EventEmitter<{
    filterDate: boolean;
    filterMatter: boolean;
    filterTimeDescription: boolean;
  }>();
  @Output() clearFilterDate: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() clearFilterMatter: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() clearFilterTimeDescription: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /** Clear Filter All */
  clearFilterAllAction(): void {
    this.filterDate = false;
    this.filterMatter = false;
    this.filterTimeDescription = false;
    this.clearFilterAll.emit({
      filterDate: this.filterDate,
      filterMatter: this.filterMatter,
      filterTimeDescription: this.filterTimeDescription,
    });
  }

  /** Clear filter date */
  clearFilterDateAction(): void {
    this.filterDate = false;
    this.clearFilterDate.emit(false);
  }

  /** Clear filter matter */
  clearFilterMatterAction(): void {
    this.filterMatter = false;
    this.clearFilterMatter.emit(false);
  }

  /** Clear filter time description */
  clearFilterTimeDescriptinAction(): void {
    this.filterTimeDescription = false;
    this.clearFilterTimeDescription.emit(false);
  }
}
