import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ButtonIconComponent,
  IconsComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-modal-delete',
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
  @Output() deleteActionOut: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() cancelOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Close Modal Delete */
  closelModalDelete(): void {
    this.openModalDelete = false;
    this.cancelOut.emit(this.openModalDelete);
  }

  /** Send to consumer for continue a process */
  deleteAction(): void {
    this.openModalDelete = false;
    this.deleteActionOut.emit(this.openModalDelete);
  }
}
