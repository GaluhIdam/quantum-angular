import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterBarDTO } from './dto/filter-bar.dto';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
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
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  @Input() filterData: FilterBarDTO[] = [
    {
      label: 'Matter',
      status: false,
      formControl: new FormControl(''),
      options: [
        {
          label: 'One',
          value: 1,
          onCheck: 'on',
        },
        {
          label: 'Two',
          value: 2,
          onCheck: undefined,
        },
        {
          label: 'Three',
          value: 3,
          onCheck: undefined,
        },
        {
          label: 'Four',
          value: 4,
          onCheck: 'on',
        },
        {
          label: 'Five',
          value: 5,
          onCheck: undefined,
        },
        {
          label: 'Six',
          value: 6,
          onCheck: undefined,
        },
        {
          label: 'Seven',
          value: 7,
          onCheck: 'on',
        },
        {
          label: 'Eight',
          value: 8,
          onCheck: undefined,
        },
        {
          label: 'Nine',
          value: 9,
          onCheck: undefined,
        },
        {
          label: 'Ten',
          value: 10,
          onCheck: 'on',
        },
        {
          label: 'Eleven',
          value: 11,
          onCheck: undefined,
        },
        {
          label: 'Twelve',
          value: 12,
          onCheck: undefined,
        },
        {
          label: 'Thirteen',
          value: 13,
          onCheck: 'on',
        },
        {
          label: 'Fourteen',
          value: 14,
          onCheck: undefined,
        },
        {
          label: 'Fifteen',
          value: 15,
          onCheck: undefined,
        },
        {
          label: 'Sixteen',
          value: 16,
          onCheck: 'on',
        },
        {
          label: 'Seventeen',
          value: 17,
          onCheck: undefined,
        },
        {
          label: 'Eighteen',
          value: 18,
          onCheck: undefined,
        },
        {
          label: 'Nineteen',
          value: 19,
          onCheck: 'on',
        },
        {
          label: 'Twenty',
          value: 20,
          onCheck: undefined,
        },
      ],
      selected: [],
    },
    {
      label: 'Matter Type',
      status: false,
      formControl: new FormControl(''),
      options: [],
      selected: [],
    },
    {
      label: 'Billabilty',
      status: false,
      formControl: new FormControl(''),
      options: [],
      selected: [],
    },
    {
      label: 'Practice Group',
      status: false,
      formControl: new FormControl(''),
      options: [],
      selected: [],
    },
    {
      label: 'Practice Area',
      status: false,
      formControl: new FormControl(''),
      options: [],
      selected: [],
    },
    {
      label: 'Practice Members',
      status: false,
      formControl: new FormControl(''),
      options: [],
      selected: [],
    },
  ];
  @Input() isOpenModal: boolean = false;

  /** Close modal */
  closelModal(): void {
    this.isOpenModal = false;
  }

  clickHandle(event: any): void {
    console.log(event);
  }

  /** Count how many item is ON */
  counterSelected(data: SelectableDTO[]): number {
    return data.filter((item) => item.onCheck === 'on').length;
  }

  selectFilter(item: FilterBarDTO): void {
    item.status = !item.status;
  }

  /** Pick up or drop filter */
  pickUpFilter(param: boolean): void {
    if (!param) {
      this.filterData.forEach((item) => (item.status = false));
    }
    this.closelModal();
  }
}
