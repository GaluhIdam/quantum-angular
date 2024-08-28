import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  TextareaComponent,
  TextComponent,
  TooltipComponent,
  ValidatorFieldComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FormControlComponent } from '../../../../shared/form-control/form-control.component';

@Component({
  selector: 'step-2',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    FormControlComponent,
  ],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss',
})
export class Step2Component {
  matterNumberForm: FormControl = new FormControl('', Validators.required);
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

  isCollapsed: boolean = false;

  slideOut(event: number): void {
    this.currentSlideIndex = event;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
