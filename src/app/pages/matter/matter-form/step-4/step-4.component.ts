import { FlyoutSimpleComponent } from './../../../../shared/flyout-simple/flyout-simple.component';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppendComponent,
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-4',
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
    TextareaComponent,
    TooltipComponent,
    SelectFieldComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyDataComponent,
    TableBodyRowComponent,
    FlyoutSimpleComponent,
  ],
  templateUrl: './step-4.component.html',
  styleUrl: './step-4.component.scss',
})
export class Step4Component {
  isCounterparty: boolean = false;
  isOtherStackholder: boolean = false;

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

  isOpenFlyoutManageController: boolean = false;
  isOpenFlyoutOtherStackholder: boolean = false;

  isProjectName: boolean = false;

  slideOut(event: number): void {
    this.currentSlideIndex = event;
  }

  openFlyoutManageController(): void {
    this.isOpenFlyoutManageController = !this.isOpenFlyoutManageController;
  }
  openFlyoutOtherStackholder(): void {
    this.isOpenFlyoutOtherStackholder = !this.isOpenFlyoutOtherStackholder;
  }
}
