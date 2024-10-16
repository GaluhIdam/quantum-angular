import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterGroupButtonComponent, FilterGroupComponent } from '@quantum/fui';

@Component({
  selector: 'shared-button-group',
  standalone: true,
  imports: [CommonModule, FilterGroupComponent, FilterGroupButtonComponent],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {
  @Input({ required: true }) btnList: {
    title: string;
    status: boolean;
    total: number | null;
  }[] = [];
  @Input() single: boolean = true;

  @Output() action: EventEmitter<{
    title: string;
    status: boolean;
    total: number | null;
  }> = new EventEmitter<{
    title: string;
    status: boolean;
    total: number | null;
  }>();

  /** Click button */
  activeBtn(param: {
    title: string;
    status: boolean;
    total: number | null;
  }): void {
    this.btnList.some((item) => {
      if (item.title === param.title && item.total === param.total) {
        item.status = !item.status;
        this.action.emit(item);
      } else {
        if (this.single) {
          item.status = false;
        }
      }
    });
  }
}
