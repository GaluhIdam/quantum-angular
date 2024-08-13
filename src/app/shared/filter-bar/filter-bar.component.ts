import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterBarDTO } from './dto/filter-bar.dto';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  IconsComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
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
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  @Input() filterData: FilterBarDTO[] = [
    {
      label: 'Test Filter',
      formControl: new FormControl(''),
      options: [
        {
          name: 'One',
          value: 1,
        },
        {
          name: 'Two',
          value: 2,
        },
      ],
      selected: [],
    },
    {
      label: 'Test Filter',
      formControl: new FormControl(''),
      options: [
        {
          name: 'One',
          value: 1,
        },
        {
          name: 'Two',
          value: 2,
        },
      ],
      selected: [],
    },
    {
      label: 'Test Filter',
      formControl: new FormControl(''),
      options: [
        {
          name: 'One',
          value: 1,
        },
        {
          name: 'Two',
          value: 2,
        },
      ],
      selected: [],
    },
  ];
  @Input() isOpenModal: boolean = false;

  filterSelected: FilterBarDTO[] = [];

  /** Close modal */
  closelModal(): void {
    this.isOpenModal = false;
  }
}
