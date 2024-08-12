import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActionBtn } from './table-type';
import { CommonModule } from '@angular/common';
import {
  ButtonIconComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
} from '@quantum/fui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-table-auto-generate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
    ButtonIconComponent,
    TextComponent,
  ],
  templateUrl: './table-auto-generate.component.html',
  styleUrl: './table-auto-generate.component.scss',
})
export class TableAutoGenerateComponent implements OnChanges {
  @Input({ required: true }) title: string[] = ['Product', 'Description'];
  @Input() headerAlign: 'left' | 'center' | 'right' = 'left';
  @Input({ required: true }) property: string[] = ['name', 'description'];
  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) limit: number = 10;
  @Input({ required: true }) totalItems: number = 100;
  @Input() action: ActionBtn[] = ['create', 'edit', 'delete'];
  @Input() showInfo: boolean = false;

  // New input to trigger selection clearing
  @Input() clearSelection: boolean = false;

  @Output() pagination: EventEmitter<{ page: number; itemsPerPage: number }> =
    new EventEmitter<{ page: number; itemsPerPage: number }>();
  @Output() actionOut: EventEmitter<{ action: ActionBtn; data: any }> =
    new EventEmitter<{ action: ActionBtn; data: any }>();
  @Output() selectedItemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  checkedItemIndex: Set<number> = new Set<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clearSelection'] && changes['clearSelection'].currentValue) {
      this.clearAllSelections();
    }
  }

  /** Handling For Pagination */
  onPageChanges(event: { page: number; itemsPerPage: number }): void {
    this.pagination.emit(event);
  }

  /** Getting Object to be data */
  protected _getObjectKeys(obj: any): string[] {
    if (obj && typeof obj === 'object') {
      return Object.keys(obj);
    } else {
      return [];
    }
  }

  /** Toggle Action */
  actionToggle(action: ActionBtn, data: any): void {
    const param: { action: ActionBtn; data: any } = {
      action: action,
      data: data,
    };
    this.actionOut.emit(param);
  }

  /** Handle checkbox change for a single item */
  onCheckboxChange(index: number): void {
    if (this.checkedItemIndex.has(index)) {
      this.checkedItemIndex.delete(index);
    } else {
      this.checkedItemIndex.add(index);
    }
    this.emitSelectedItems();
  }

  /** Handle "Select All" checkbox change */
  onSelectAllChange(event: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.checkedItemIndex = new Set(this.data.map((_, index) => index));
    } else {
      this.checkedItemIndex.clear();
    }
    this.emitSelectedItems();
  }

  /** Check if a single item is selected */
  isChecked(index: number): boolean {
    return this.checkedItemIndex.has(index);
  }

  /** Check if all items are selected */
  isAllSelected(): boolean {
    return this.checkedItemIndex.size === this.data.length;
  }

  /** Emit the selected items */
  private emitSelectedItems(): void {
    const selectedItems = Array.from(this.checkedItemIndex).map(
      (index) => this.data[index]
    );
    this.selectedItemsChange.emit(selectedItems);
  }

  /** Clear all selections */
  private clearAllSelections(): void {
    this.checkedItemIndex.clear();
    this.emitSelectedItems();
  }
}

