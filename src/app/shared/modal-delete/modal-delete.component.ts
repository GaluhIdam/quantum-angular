import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ButtonIconComponent,
  Icon,
  IconsComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'shared-modal-delete',
  standalone: true,
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    IconsComponent,
    ButtonIconComponent,
    TextComponent,
  ],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss',
})
export class ModalDeleteComponent {
  @Input({ required: true }) openModalDelete: boolean = false;
  @Input() title: string = 'Delete Confirmation?';
  @Input() desc: string =
    'This data will be permanently deleted. Do you want to continue?';
  @Input() btnContinue: string = 'Delete';
  @Input() option: 'iconText' | 'icon' | 'text' = 'text';
  @Input() icon: Icon = 'trash';
  @Output() action: EventEmitter<{
    name: string;
    status: boolean;
  }> = new EventEmitter<{
    name: string;
    status: boolean;
  }>();

  /** Close Modal Delete */
  closelModalDelete(): void {
    this.openModalDelete = false;
    this.action.emit({
      name: 'cancel',
      status: false,
    });
  }

  /** Send to consumer for continue a process */
  deleteAction(): void {
    this.openModalDelete = false;
    this.action.emit({
      name: 'delete',
      status: false,
    });
  }
}
