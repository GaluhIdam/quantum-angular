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
import { TransactionCaseInformationComponent } from './transaction-case-information/transaction-case-information.component';
import { OtherInformationComponent } from './other-information/other-information.component';

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

    TransactionCaseInformationComponent,
    OtherInformationComponent,
  ],
  templateUrl: './step-4.component.html',
  styleUrl: './step-4.component.scss',
})
export class Step4Component {}
