import { Component, Input, SimpleChanges } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  IconsComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
} from '@quantum/fui';
import { MatterDTO, MyTimesheetDTO } from '../../dtos/my-timesheet.dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-move-matter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonIconComponent,
    BadgeComponent,
    IconsComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ComboBoxComponent,
  ],
  templateUrl: './move-matter.component.html',
  styleUrl: './move-matter.component.scss',
})
export class MoveMatterComponent {
  @Input() listMatters: MatterDTO[] = [];
  @Input() timesheetSelected: MyTimesheetDTO[] = [];

  optionMatters: {
    name: string;
    value: any;
  }[] = [];
  selectedMatters: {
    name: string;
    value: any;
  }[] = [];

  searchForm: FormControl = new FormControl('');

  isModalOpen: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.listMatters.forEach((item) => {
        this.optionMatters.push({
          name: item.matter,
          value: item.idMatter,
        });
      });
    }
  }

  /** Open Modal */
  handleOpenModal(): void {
    this.isModalOpen = true;
  }

  /** Close Modal */
  handleCloseModal(): void {
    this.isModalOpen = false;
  }
}
