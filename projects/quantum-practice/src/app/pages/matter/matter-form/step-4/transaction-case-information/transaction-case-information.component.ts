import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  Icon,
  IconsComponent,
  InputFieldComponent,
  LinkComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FlyoutContactPersonComponent } from '../../flyout-shared/flyout-contact-person/flyout-contact-person.component';
import { FlyoutOtherStakeholderComponent } from '../../flyout-shared/flyout-other-stakeholder/flyout-other-stakeholder.component';

@Component({
  selector: 'app-transaction-case-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextComponent,
    FormControlLayoutComponent,
    TextareaComponent,
    ComboBoxComponent,
    ButtonIconComponent,
    SelectFieldComponent,
    InputFieldComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    BadgeComponent,
    LinkComponent,
    TooltipComponent,
    IconsComponent,
    FlyoutContactPersonComponent,
    FlyoutOtherStakeholderComponent,
  ],
  templateUrl: './transaction-case-information.component.html',
  styleUrl: './transaction-case-information.component.scss',
})
export class TransactionCaseInformationComponent {
  isCounterparty: boolean = false;
  isOtherStakeholder: boolean = false;
  isTransaction: boolean = false;
  isJurisdiction: boolean = false;
  isAddTranc: boolean = false;

  dataSlider: {
    id: number;
    title: string;
    status: boolean;
    icon: Icon;
    link: string;
  }[] = [
    {
      id: 1,
      title: 'Big Kahuna Burger Ltd.',
      link: '',
      status: true,
      icon: 'node',
    },
    {
      id: 2,
      title: 'Miniso Lifestyle Trading Indonesia',
      link: '',
      status: false,
      icon: 'node',
    },
    {
      id: 3,
      title: 'Global Industries Ltd',
      link: '',
      status: false,
      icon: 'node',
    },
  ];

  currentSlideIndex: number = 0;

  clientData: {
    parent: string;
    companyOrigin: string;
    address: string;
    entityType: string;
    industry: string;
  }[] = [
    {
      parent: 'N/A',
      companyOrigin: 'N/A',
      address:
        'Puri Imperium Office Plaza, G-7 Jl. Kuningan Madya Kav 5-6, Kuningan',
      entityType: 'MNC Regional',
      industry: 'General Retail',
    },
    {
      parent: 'Acme Corporation',
      companyOrigin: 'USA',
      address: '123 Elm Street, Suite 400, San Francisco, CA 94107',
      entityType: 'Private',
      industry: 'Technology',
    },
    {
      parent: 'Global Industries Ltd.',
      companyOrigin: 'UK',
      address: '456 Oxford Road, Building A, London, W1D 1AN',
      entityType: 'Public',
      industry: 'Manufacturing',
    },
  ];

  confidentialityForm: FormControl = new FormControl(
    'Confidential: May be used in marketing materials'
  );
  confidentialityOption: { label: string; value: any }[] = [
    {
      label: 'Confidential: May be used in marketing materials',
      value: 'Confidential: May be used in marketing materials',
    },
    {
      label:
        'Not Confidential: Can be disclosed and include marketing material',
      value:
        'Not Confidential: Can be disclosed and include marketing material',
    },
  ];

  title: string[] = ['Name', 'Position', ''];
  dataContent: { name: string; position: string }[] = [
    { name: 'Devon Lane (DL)', position: 'Senior Associate' },
  ];

  isOpenFlyoutOtherStackholder: boolean = false;
  isOpenFlyoutContactPerson: boolean = false;

  slideOut(event: number): void {
    this.currentSlideIndex = event;
  }

  /** Open Close Flyout Contact Person */
  opeCloseFlyout(param: 'CP' | 'SH'): void {
    if (param === 'CP') {
      this.isOpenFlyoutContactPerson = !this.isOpenFlyoutContactPerson;
    }
    if (param === 'SH') {
      this.isOpenFlyoutOtherStackholder = !this.isOpenFlyoutOtherStackholder;
    }
  }
}
