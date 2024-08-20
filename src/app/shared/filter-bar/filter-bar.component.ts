import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FilterBarDTO } from './dto/filter-bar.dto';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  DatePickerComponent,
  DateRangeComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  PopoverComponent,
  SelectableComponent,
  SelectableDTO,
  TextComponent,
  TimeSelectionComponent,
} from '@quantum/fui';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    ComboBoxComponent,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    IconsComponent,
    TextComponent,
    ButtonIconComponent,
    BadgeComponent,
    PopoverComponent,
    SelectableComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    DatePickerComponent,
    DateRangeComponent,
    TimeSelectionComponent,
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  @Input() filterData: FilterBarDTO[] = [
    {
      label: 'Combo Box',
      status: true,
      formControl: new FormControl(''),
      type: 'combo-box',
      options: [],
      selected: [],
    },
    {
      label: 'Text Input',
      status: true,
      formControl: new FormControl(''),
      selected: [],
      type: 'text',
      options: [],
    },
    {
      label: 'Date Picker',
      status: true,
      formControl: new FormControl(''),
      selected: [],
      type: 'datePicker',
      options: [],
    },
    {
      label: 'Date Range',
      status: true,
      formControl: new FormControl(''),
      selected: [],
      type: 'dateRange',
      options: [],
    },
    {
      label: 'Time Selection',
      status: true,
      formControl: new FormControl(''),
      selected: [],
      type: 'time-selection',
      options: [],
    },
  ];
  @Input() isOpenModal: boolean = false;

  showHide: boolean[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.filterData.forEach((item) => {
      this.showHide.push(false);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterData']) {
      this.filterData.forEach((item) => {
        this.showHide.push(false);
      });
    }
  }

  /** Open/close popover */
  openClosePopover(index: number, status: boolean): void {
    this.showHide = [];
    this.filterData.forEach(() => {
      this.showHide.push(false);
    });
    this.showHide[index] = status;
  }

  /** Close modal */
  closelModal(): void {
    this.isOpenModal = false;
    this.filterData.forEach((item) => (item.status = false));
  }

  selectFilter(item: FilterBarDTO): void {
    item.status = !item.status;
  }

  /** Pick up or drop filter */
  pickUpFilter(): void {
    this.isOpenModal = false;
  }

  /** Clear all filters */
  clearAll(): void {
    this.filterData.forEach((item) => (item.status = false));
  }
}
