import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FilterBarDTO, OutputFilterBar } from './dto/filter-bar.dto';
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
  @Input() optionColumn: { name: string; value: any }[] = [
    { name: 'Name', value: { value: '', type: 'text' } },
    { name: 'Status', value: { value: '', type: 'combo-box' } },
    { name: 'Duration', value: { value: '', type: 'time-selection' } },
    { name: 'Date', value: { value: '', type: 'datePicker' } },
  ];
  @Input() filterData: FilterBarDTO[] = [
    {
      formControlWhere: new FormControl(''),
      optionsWhere: [
        { name: 'And', value: 'and' },
        { name: 'OR', value: 'or' },
      ],
      selectedWhere: [{ name: 'And', value: 'and' }],
      formControlColumn: new FormControl(''),
      optionsColumn: this.optionColumn,
      selectedColumn: [],
      formControlCondition: new FormControl(''),
      optionsCondition: [],
      selectedCondition: [],
      formControlValue: new FormControl(''),
      optionsValue: [],
      selectedValue: [],
      typeForm: 'text',
    },
  ];
  @Input() isOpenModal: boolean = false;

  @Output() action: EventEmitter<OutputFilterBar[]> = new EventEmitter<
    OutputFilterBar[]
  >();

  dataFilterOut: OutputFilterBar[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  /** Add new form filter */
  addFilterForm(): void {
    this.filterData.push({
      formControlWhere: new FormControl('AND'),
      optionsWhere: [
        { name: 'AND', value: 'and' },
        { name: 'OR', value: 'or' },
      ],
      selectedWhere: [{ name: 'And', value: 'and' }],
      formControlColumn: new FormControl(''),
      optionsColumn: this.optionColumn,
      selectedColumn: [],
      formControlCondition: new FormControl(''),
      optionsCondition: [],
      selectedCondition: [],
      formControlValue: new FormControl(''),
      optionsValue: [],
      selectedValue: [],
      typeForm: 'text',
    });
  }

  /** Remove form filter */
  removeFilterData(index: number): void {
    if (index > -1 && index < this.filterData.length) {
      this.filterData.splice(index, 1);
      this.dataFilterOut.splice(index, 1);
    }
  }

  /** Observe changes form column */
  selectColumn(event: any, item: FilterBarDTO): void {
    item.formControlValue.setValue('');
    item.selectedColumn = event;
    this.updateOptionsValue(item);

    // Extract the name and value from the current item
    const filterName = item.formControlColumn.value;
    const filterValue = item.formControlValue.value;
    console.log(item.formControlValue.value);

    // Check if an entry with the same name already exists in dataFilterOut
    const existingFilter = this.dataFilterOut.find(
      (filter) => filter.column === filterName
    );

    if (existingFilter) {
      // Update the existing entry's value
      existingFilter.value = filterValue;
    } else {
      // Add a new entry if it doesn't exist
      this.dataFilterOut.push({
        where: '',
        column: filterName,
        condition: 'is',
        value: 'user',
      });
    }
  }

  /** Update optionsValue based on selected column */
  private updateOptionsValue(item: FilterBarDTO): void {
    const selectedColumn = item.selectedColumn[0];
    if (selectedColumn?.value.type === 'combo-box') {
      item.optionsValue = [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
      ];
    } else {
      item.optionsValue = [];
    }
  }

  selectionValue(event: any, item: FilterBarDTO): void {
    item.selectedValue = event;
  }

  selectionCondition(event: any, item: FilterBarDTO): void {
    item.selectedCondition = event;
  }

  /** Open/close popover */
  openClosePopover(index: number, status: boolean): void {}

  /** Close modal */
  closelModal(): void {
    this.isOpenModal = false;
  }

  /** Pick up or drop filter */
  pickUpFilter(): void {
    this.isOpenModal = false;
    console.log(this.dataFilterOut);
  }

  /** Clear all filters */
  clearAll(): void {
    this.dataFilterOut = [];
    this.filterData = [
      {
        formControlWhere: new FormControl(''),
        optionsWhere: [
          { name: 'And', value: 'and' },
          { name: 'OR', value: 'or' },
        ],
        selectedWhere: [{ name: 'And', value: 'and' }],
        formControlColumn: new FormControl(''),
        optionsColumn: this.optionColumn,
        selectedColumn: [],
        formControlCondition: new FormControl(''),
        optionsCondition: [],
        selectedCondition: [],
        formControlValue: new FormControl(''),
        optionsValue: [],
        selectedValue: [],
        typeForm: 'text',
      },
    ];
  }
}
