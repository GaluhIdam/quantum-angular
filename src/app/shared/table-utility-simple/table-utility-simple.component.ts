import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent, ButtonIconComponent } from '@quantum/fui';
import { BadgeUtilDTO, BtnUtilDTO } from './dto/table-utility.dto';

@Component({
  selector: 'shared-table-utility-simple',
  standalone: true,
  imports: [CommonModule, ButtonIconComponent, BadgeComponent],
  templateUrl: './table-utility-simple.component.html',
  styleUrls: ['./table-utility-simple.component.scss'],
})
export class TableUtilitySimpleComponent {
  /** Left Before position */
  @Input() leftBeforeBtnUtil: BtnUtilDTO[] = [];
  @Input() leftBeforeBagdeUtil: BadgeUtilDTO[] = [];

  /** Left After position */
  @Input() leftAfterBtnUtil: BtnUtilDTO[] = [];
  @Input() leftAfterBagdeUtil: BadgeUtilDTO[] = [];

  /** Right Before position */
  @Input() rightBeforeBtnUtil: BtnUtilDTO[] = [];
  @Input() rightBeforeBagdeUtil: BadgeUtilDTO[] = [];

  /** Right After position */
  @Input() rightAfterBtnUtil: BtnUtilDTO[] = [];
  @Input() rightAfterBagdeUtil: BadgeUtilDTO[] = [];

  /** Tell consumer about Identity Button for next action */
  @Output() btnAction: EventEmitter<string | number> = new EventEmitter<
    string | number
  >();

  /** Toggle Click Button */
  toggleBtn(param: string | number): void {
    this.btnAction.emit(param);
  }
}
