import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TableHeadComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSimpleComponent } from '../../../../../shared/flyout-simple/flyout-simple.component';
import { EmptyDataComponent } from '../../../../../shared/empty-data/empty-data.component';

@Component({
  selector: 'app-flyout-matter-members',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlyoutSimpleComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyDataComponent,
    ButtonIconComponent,
    TextComponent,
    EmptyDataComponent,
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
  ],
  templateUrl: './flyout-matter-members.component.html',
  styleUrl: './flyout-matter-members.component.scss',
})
export class FlyoutMatterMembersComponent {
  @Input({ required: true }) isOpenFlyoutManageMember: boolean = false;
  @Input() title: string = 'Manage Members';

  /** Matter Members Form */
  @Input() allEmployeList: { name: string; position: string }[] = [];
  @Input() selectedEmployeMatterMember: { name: string; position: string }[] =
    [];

  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectionOut: EventEmitter<{ name: string; position: string }[]> =
    new EventEmitter<{ name: string; position: string }[]>();

  isProjectName: boolean = false;

  headerTable: string[] = ['Name', 'Position', ''];

  /** Open/Close Flyout Manage Members */
  openFlyoutManageMember(): void {
    this.isOpenFlyoutManageMember = !this.isOpenFlyoutManageMember;
    this.closeOut.emit(this.isOpenFlyoutManageMember);
  }

  /** Add or remove members for Matter Members */
  addRemoveMatterMember(
    item: { name: string; position: string },
    option: 'add' | 'remove'
  ): void {
    if (option === 'add') {
      this.selectedEmployeMatterMember.push(item);
      this.selectionOut.emit(this.selectedEmployeMatterMember);
    } else if (option === 'remove') {
      const index = this.selectedEmployeMatterMember.findIndex(
        (member) =>
          member.name === item.name && member.position === item.position
      );

      if (index !== -1) {
        this.selectedEmployeMatterMember.splice(index, 1);
      }
      this.selectionOut.emit(this.selectedEmployeMatterMember);
    }
  }
}
