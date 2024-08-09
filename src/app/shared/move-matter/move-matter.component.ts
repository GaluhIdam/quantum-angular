import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  LoadingComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  PopoverComponent,
  TextComponent,
} from '@quantum/fui';
import { MatterDTO, MyTimesheetDTO } from '../../pages/matter/my-timesheet/dtos/my-timesheet.dto';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyTimesheetService } from '../../pages/matter/my-timesheet/services/my-timesheet.service';
import { debounceTime, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'shared-move-matter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonIconComponent,
    BadgeComponent,
    IconsComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ComboBoxComponent,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    PopoverComponent,
    LoadingComponent,
  ],
  templateUrl: './move-matter.component.html',
  styleUrl: './move-matter.component.scss',
})
export class MoveMatterComponent {
  @Input() listMatters: MatterDTO[] = [];
  @Input() timesheetSelected: MyTimesheetDTO[] = [];
  @Output() action: EventEmitter<MyTimesheetDTO[]> = new EventEmitter<
    MyTimesheetDTO[]
  >();

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
  isOption: boolean = false;
  showDesc: boolean = false;
  loading: boolean = false;

  constructor(private readonly myTimesheetService: MyTimesheetService) {}

  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchForm.valueChanges
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(500),
        map((value) => {
          this.getMatterData(value);
        })
      )
      .subscribe();
  }

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

  /** Get matters from service */
  getMatterData(search: string): void {
    this.myTimesheetService
      .getMatters(search)
      .pipe(map((data) => (this.listMatters = data)))
      .subscribe(() => {
        this.loading = false;
      });
  }

  /** Move timesheet action, return data to consumer */
  moveTimesheet(): void {
    this.action.emit(this.timesheetSelected);
  }

  /** Clear Selection */
  clearSelection(): void {
    this.timesheetSelected = [];
    this.action.emit([]);
  }

  /** Open Modal */
  handleOpenModal(): void {
    this.isModalOpen = true;
  }

  /** Close Modal */
  handleCloseModal(): void {
    this.isModalOpen = false;
  }

  /** Open/close option */
  openClose(param: boolean): void {
    setTimeout(() => {
      this.isOption = param;
    }, 200);
  }

  selectionOption(param: MatterDTO): void {
    this.searchForm.setValue(param.matter);
  }
}
