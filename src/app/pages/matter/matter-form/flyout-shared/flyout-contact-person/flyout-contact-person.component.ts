import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  InputFieldComponent,
  PrependComponent,
  SelectFieldComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';

@Component({
  selector: 'app-flyout-contact-person',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutSimpleComponent,
    TextComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    InputFieldComponent,
    PrependComponent,
    ButtonIconComponent,
  ],
  templateUrl: './flyout-contact-person.component.html',
  styleUrl: './flyout-contact-person.component.scss',
})
export class FlyoutContactPersonComponent {
  @Input() isOpenFlyoutContactPerson: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Open/Close Flyout */
  openFlyoutContactPerson(): void {
    this.isOpenFlyoutContactPerson = !this.isOpenFlyoutContactPerson;
    this.closeOut.emit(this.isOpenFlyoutContactPerson);
  }
}
