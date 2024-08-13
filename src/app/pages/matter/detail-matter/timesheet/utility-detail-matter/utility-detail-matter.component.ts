import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-utility-detail-matter',
  standalone: true,
  imports: [
    CommonModule,
    ButtonIconComponent,
    TooltipComponent,
    BadgeComponent,
    TextComponent,
  ],
  providers: [DatePipe],
  templateUrl: './utility-detail-matter.component.html',
  styleUrl: './utility-detail-matter.component.scss',
})
export class UtilityDetailMatterComponent {
  @Output() actionBtn: EventEmitter<
    'update' | 'download' | 'filter' | 'create'
  > = new EventEmitter<'update' | 'download' | 'filter' | 'create'>();

  /** Action button */
  action(param: 'update' | 'download' | 'filter' | 'create'): void {
    this.actionBtn.emit(param);
  }
}
