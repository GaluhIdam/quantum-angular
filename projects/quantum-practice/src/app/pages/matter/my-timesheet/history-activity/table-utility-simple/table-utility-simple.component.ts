import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  BadgeComponent,
  ButtonIconComponent,
  TextComponent,
  TooltipComponent,
} from '@quantum/fui';

@Component({
  selector: 'shared-table-utility-simple',
  standalone: true,
  imports: [
    CommonModule,
    ButtonIconComponent,
    BadgeComponent,
    TextComponent,
    TooltipComponent,
  ],
  templateUrl: './table-utility-simple.component.html',
  styleUrls: ['./table-utility-simple.component.scss'],
})
export class TableUtilitySimpleComponent {
  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();
  @Input() duration: string = '0h 0m';
  @Input() nextBtn: boolean = true;
  @Input() prevBtn: boolean = true;

  /** Tell consumer about Identity Button for next action */
  @Output() actionOut: EventEmitter<'next' | 'prev' | 'filter' | 'add'> =
    new EventEmitter<'next' | 'prev' | 'filter' | 'add'>();

  /** Toggle Click Button */
  toggleBtn(param: 'next' | 'prev' | 'filter' | 'add'): void {
    this.actionOut.emit(param);
  }
}
