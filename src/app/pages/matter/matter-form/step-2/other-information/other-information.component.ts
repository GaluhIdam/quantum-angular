import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BadgeComponent,
  ButtonIconComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutMatterMembersComponent } from '../../flyout-shared/flyout-matter-members/flyout-matter-members.component';

@Component({
  selector: 'app-other-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextComponent,
    BadgeComponent,
    ButtonIconComponent,
    FlyoutMatterMembersComponent,
  ],
  templateUrl: './other-information.component.html',
  styleUrl: './other-information.component.scss',
})
export class OtherInformationComponent {
  isOpenFlyoutManageController: boolean = false;

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

  /** Open/Close Flyout Manage Members */
  openFlyoutManageController(): void {
    this.isOpenFlyoutManageController = !this.isOpenFlyoutManageController;
  }

  /** Catch data from flyout matter member */
  selectionOut(event: { name: string; position: string }[]): void {
    this.selectedEmployeMatterMember = event;
  }
}
