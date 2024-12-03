import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  FormControlLayoutComponent,
  SelectFieldComponent,
  TextareaComponent,
  TextComponent,
} from '@quantum/fui';
import { SliderCardComponent } from '../../../../../shared/slider-card/slider-card.component';
import { SliderCardBodyComponent } from '../../../../../shared/slider-card/slider-card-body/slider-card-body.component';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';
import { FlyoutMatterMembersComponent } from '../../flyout-shared/flyout-matter-members/flyout-matter-members.component';

@Component({
  selector: 'app-other-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextComponent,
    FormControlLayoutComponent,
    SelectFieldComponent,
    TextareaComponent,
    SliderCardComponent,
    SliderCardBodyComponent,
    FlyoutSimpleComponent,
    ComboBoxComponent,
    ButtonIconComponent,
    FlyoutMatterMembersComponent,
  ],
  templateUrl: './other-information.component.html',
  styleUrl: './other-information.component.scss',
})
export class OtherInformationComponent {
  /** Matter Members Form */
  allEmployeList: { name: string; position: string }[] = [
    {
      name: 'Jane Cooper (JC)',
      position: 'Junior Associate',
    },
    {
      name: 'Devon Lane (DL)',
      position: 'Middle Associate',
    },
    {
      name: 'Robert Fox (RF)',
      position: 'Senior Associate',
    },
  ];
  selectedEmployeMatterMember: { name: string; position: string }[] = [];

  isProjectName: boolean = false;
  isOpenFlyoutManageController: boolean = false;

  openFlyoutManageController(): void {
    this.isOpenFlyoutManageController = !this.isOpenFlyoutManageController;
  }
  /** Catch data from flyout matter member */
  selectionOut(event: { name: string; position: string }[]): void {
    this.selectedEmployeMatterMember = event;
  }
}
