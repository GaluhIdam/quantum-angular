import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  LoadingComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  PopoverComponent,
} from '@quantum/fui';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, map, Subscription, tap } from 'rxjs';
import { MatterDTO } from '../../interfaces/matter.dto';

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
    FormControlLayoutComponent,
    InputFieldComponent,
    PopoverComponent,
    LoadingComponent,
  ],
  templateUrl: './move-matter.component.html',
  styleUrl: './move-matter.component.scss',
})
export class MoveMatterComponent {
  @Input({ required: true }) listMatters: MatterDTO[] = [];
  @Input({ required: true }) totalItemSelected: number = 0;
  @Input() writeOff: boolean = false;
  @Output() searchOut: EventEmitter<string> = new EventEmitter<string>();
  @Output() actionOut: EventEmitter<MatterDTO | null> =
    new EventEmitter<MatterDTO | null>();

  /** Form for search matter */
  searchForm: FormControl = new FormControl('');

  /** Matter selected for move */
  matterSelected: MatterDTO | null = null;

  loading: boolean = false;
  isModalOpen: boolean = false;
  showDesc: boolean = false;

  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchForm.valueChanges
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(500),
        map((value) => {
          this.loading = false;
          this.searchOut.emit(value);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Toggle for open/close modal */
  toggleOpenCloseModal(param: boolean): void {
    this.isModalOpen = param;
  }
  /** Toggle select matter */
  toggleSelectMatter(matter: MatterDTO): void {
    this.matterSelected = matter;
    this.searchForm.setValue(matter.matter);
  }

  /** Reset matter search and matter selected */
  toggleReset(): void {
    this.searchForm = new FormControl('');
    this.matterSelected = null;
  }

  /** Toggle move timesheet */
  toggleMoveTimesheet(): void {
    this.toggleOpenCloseModal(false);
    if (this.searchForm.value !== null || this.searchForm.value !== '') {
      this.actionOut.emit(this.matterSelected);
    }
  }
}
