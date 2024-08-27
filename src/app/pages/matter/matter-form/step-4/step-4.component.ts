import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppendComponent,
  BadgeComponent,
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  LinkComponent,
  PrependComponent,
  TextComponent,
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
  ],
  templateUrl: './step-4.component.html',
  styleUrl: './step-4.component.scss',
})
export class Step4Component {}
