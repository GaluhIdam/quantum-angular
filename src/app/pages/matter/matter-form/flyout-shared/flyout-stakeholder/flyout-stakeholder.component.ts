import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  InputFieldComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
} from '@quantum/fui';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';

@Component({
  selector: 'app-flyout-stakeholder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutSimpleComponent,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    SelectFieldComponent,
    TextareaComponent,
    ButtonIconComponent,
  ],
  templateUrl: './flyout-stakeholder.component.html',
  styleUrl: './flyout-stakeholder.component.scss',
})
export class FlyoutStakeholderComponent {
  @Input() isOpenFlyoutStakeHolder: boolean = false;
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** New Stakeholder Form */

  // General Information
  stakeholderNameForm: FormControl = new FormControl('');
  parentGroupCompanyForm: FormControl = new FormControl('');
  isParentGroupCompany: boolean = false;
  parentGroupCompanyOrigiinCountry: FormControl = new FormControl('');
  parentGroupCompanyOrigiinCountryOption: { label: string; value: any }[] = [];
  addressNameForm: FormControl = new FormControl('');
  companyNameForm: FormControl = new FormControl('');
  locationCompanyForm: FormControl = new FormControl('');

  // Billing Information
  npwpNumberForm: FormControl = new FormControl('');
  billingNameForm: FormControl = new FormControl('');
  isBillingAddress: boolean = false;
  billingAddressNameForm: FormControl = new FormControl('');
  billingAddressForm: FormControl = new FormControl('');
  locationBillingForm: FormControl = new FormControl('');

  /** Open/Close Flyout */
  openFlyoutStakeholder(): void {
    this.isOpenFlyoutStakeHolder = !this.isOpenFlyoutStakeHolder;
    this.closeOut.emit(this.isOpenFlyoutStakeHolder);
  }
}
