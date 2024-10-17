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
  @Input() nextPrevBtn: boolean = true;

  /** Tell consumer about Identity Button for next action */
  @Output() btnAction: EventEmitter<string> = new EventEmitter<string>();

  /** Toggle Click Button */
  toggleBtn(param: string): void {
    this.btnAction.emit(param);
  }
}
