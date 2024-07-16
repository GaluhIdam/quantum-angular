import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  PrependComponent,
  SelectFieldComponent,
} from '@quantum/fui';
import { BaseController } from '../../../../core/controller/basecontroller';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormControlLayoutComponent,
    PrependComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
    CollapsibleNavGroupComponent,
    ComboBoxComponent,
    DateRangeComponent,
    SelectFieldComponent,
  ],
  providers: [DecimalPipe],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss',
})
export class FormSearchComponent extends BaseController {
  /** Variable Flyout & Collapsible */
  isOpenFlyout: boolean = false;
  isCollapsible: boolean = false;

  /** Option for form */
  matterCategoryOption: { name: string; value: any }[] = [];
  pacticeAreaOption: { name: string; value: any }[] = [];
  pacticeGroupOption: { name: string; value: any }[] = [];
  matterTypeOption: { name: string; value: any }[] = [];
  feeStructureOption: { name: string; value: any }[] = [];
  matterPICOption: { name: string; value: any }[] = [];
  matterMemberOption: { name: string; value: any }[] = [];
  selectOption: { label: string; value: any }[] = [
    {
      label: 'Like',
      value: 'Like',
    },
    {
      label: 'Equal',
      value: 'Equal',
    },
  ];

  /** Selected option for form */
  matterCategorySelected: { name: string; value: any }[] = [];
  pacticeAreaSelected: { name: string; value: any }[] = [];
  pacticeGroupSelected: { name: string; value: any }[] = [];
  matterTypeSelected: { name: string; value: any }[] = [];
  feeStructureSelected: { name: string; value: any }[] = [];
  matterPICSelected: { name: string; value: any }[] = [];
  matterMemberSelected: { name: string; value: any }[] = [];

  /** Form Filter */
  clientNameForm: FormControl = new FormControl();
  matterNumberForm: FormControl = new FormControl();
  projectNameForm: FormControl = new FormControl();
  matterDescriptionForm: FormControl = new FormControl();
  projectNameFormType: FormControl = new FormControl('Like');
  matterDescriptionFormType: FormControl = new FormControl('Like');
  usdForm: FormControl = new FormControl();
  completionDateStart: FormControl = new FormControl();
  completionDateEnd: FormControl = new FormControl();
  creationDateStart: FormControl = new FormControl();
  creationDateEnd: FormControl = new FormControl();

  /** Observe form */
  subscription!: Subscription;

  constructor(private readonly decimalPipe: DecimalPipe) {
    super();
    this.projectNameFormType.disable();
    this.matterDescriptionFormType.disable();
  }

  ngOnInit(): void {
    this.subscription = this.usdForm.valueChanges
      .pipe(
        tap((value) => {
          this.usdForm.setValue(this.formatNumber(value));
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /** Toggle for open flyout */
  toggleOpenFlyout(): void {
    this.isOpenFlyout = true;
  }

  /** Toggle for close flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
  }

  /** Toggle for open/close collapsible */
  toggleCollapsible(): void {
    this.isCollapsible = !this.isCollapsible;
  }

  /** Number/String converter to be 1.000.000 from 1000000 */
  formatNumber(value: number | string): string {
    if (value === null || value === undefined) {
      return '';
    }
    const numericValue =
      typeof value === 'string'
        ? parseFloat(value.replace(/\./g, '').replace(',', '.'))
        : value;

    if (isNaN(numericValue)) {
      return '';
    }
    const formattedValue = this.decimalPipe.transform(numericValue, '1.0-0');
    return formattedValue ? formattedValue.replace(/,/g, '.') : '';
  }
}
