import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  FieldFilepickerComponent,
  FormControlLayoutComponent,
  IconsComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';

@Component({
  selector: 'app-flyout-upload-matter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlyoutSimpleComponent,
    TextComponent,
    FieldFilepickerComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    TextareaComponent,
    ButtonIconComponent,
    IconsComponent,
  ],
  templateUrl: './flyout-upload-matter.component.html',
  styleUrl: './flyout-upload-matter.component.scss',
})
export class FlyoutUploadMatterComponent {
  @Input() isOpenFlyoutUploadMatter: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Flyout Upload Matter Form */
  files: File[] = [];
  languageForm: FormControl = new FormControl('');
  languageOption: { label: string; value: any }[] = [
    {
      label: 'Bahasa',
      value: 'Bahasa',
    },
    {
      label: 'English',
      value: 'English',
    },
  ];
  descriptionForm: FormControl = new FormControl('');

  /** Open/Close Flyout Matter Form */
  openFlyoutMatterForm(): void {
    this.isOpenFlyoutUploadMatter = !this.isOpenFlyoutUploadMatter;
    this.closeOut.emit(this.isOpenFlyoutUploadMatter);
  }
}
