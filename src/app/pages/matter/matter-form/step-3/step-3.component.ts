import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppendComponent,
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
  DatePickerComponent,
  FormControlLayoutComponent,
  Icon,
  IconsComponent,
  InputFieldComponent,
  LinkComponent,
  PrependComponent,
  SelectFieldComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextareaComponent,
  TextComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FlyoutSimpleComponent } from '../../../../shared/flyout-simple/flyout-simple.component';

@Component({
  selector: 'step-3',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconsComponent,
    TextComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    ValidatorFieldComponent,
    ButtonIconComponent,
    BadgeComponent,
    ComboBoxComponent,
    AppendComponent,
    PrependComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    LinkComponent,
    CollapsibleNavGroupComponent,
    SelectFieldComponent,
    TooltipComponent,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
    TableComponent,
    TableHeadComponent,
    FlyoutSimpleComponent,
    PrependComponent,
    TextareaComponent,
    DatePickerComponent,
  ],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss',
})
export class Step3Component {
  isPayingEntity: boolean = false;
  isBillingNote: boolean = false;

  pricingTypeForm: FormControl = new FormControl('Lumpsum');
  pricingTypeOption: { label: string; value: string }[] = [
    {
      label: 'Lumpsum',
      value: 'Lumpsum',
    },
    {
      label: 'Retainer',
      value: 'Retainer',
    },
    {
      label: 'Hourly',
      value: 'Hourly',
    },
    {
      label: 'Cap',
      value: 'Cap',
    },
  ];

  currencyForm: FormControl = new FormControl('USD');
  currencyOption: { label: string; value: string }[] = [
    {
      label: 'IDR',
      value: 'IDR',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
  ];

  matterNumberForm: FormControl = new FormControl('');
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

  title: string[] = ['#', 'Description', 'Amount', ''];
  titleRetainer: string[] = ['#', 'Period', 'Term', 'Description', ''];
  titleProof: string[] = ['Name', 'EL Number', 'EL Date', ''];

  isCollapsed: boolean = false;
  isFlyoutContactPerson: boolean = false;
  isFlyoutLumpsumTerm: boolean = false;
  isFlyoutRetainerTerm: boolean = false;
  isFlyoutSpecialRates: boolean = false;

  slideOut(event: number): void {
    this.currentSlideIndex = event;
  }

  openFlyouContactPerson(): void {
    this.isFlyoutContactPerson = !this.isFlyoutContactPerson;
  }

  openFlyouLumpsumTerm(): void {
    this.isFlyoutLumpsumTerm = !this.isFlyoutLumpsumTerm;
  }

  openFlyouRetainerTerm(): void {
    this.isFlyoutRetainerTerm = !this.isFlyoutRetainerTerm;
  }
  openFlyouSpecialRates(): void {
    this.isFlyoutSpecialRates = !this.isFlyoutSpecialRates;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}