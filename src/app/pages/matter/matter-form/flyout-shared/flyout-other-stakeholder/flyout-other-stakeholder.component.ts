import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';

@Component({
  selector: 'app-flyout-other-stakeholder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    ComboBoxComponent,
    FlyoutSimpleComponent,
    TextareaComponent,
    ButtonIconComponent,
  ],
  templateUrl: './flyout-other-stakeholder.component.html',
  styleUrl: './flyout-other-stakeholder.component.scss',
})
export class FlyoutOtherStakeholderComponent {
  @Input() isOpenFlyoutOtherStackholder: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Open/Close Flyout */
  openFlyoutOtherStackholder(): void {
    this.isOpenFlyoutOtherStackholder = !this.isOpenFlyoutOtherStackholder;
    this.closeOut.emit(this.isOpenFlyoutOtherStackholder);
  }
}
