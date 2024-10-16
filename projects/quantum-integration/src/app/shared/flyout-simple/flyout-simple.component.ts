import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  TextComponent,
} from '@quantum/fui';

@Component({
  selector: 'shared-flyout-simple',
  standalone: true,
  imports: [
    CommonModule,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
    TextComponent,
  ],
  templateUrl: './flyout-simple.component.html',
  styleUrl: './flyout-simple.component.scss',
})
export class FlyoutSimpleComponent {
  @Input() isOpenFlyout: boolean = false;
  @Input() titleFlyout: string = 'Title Flyout';
  @Input() size: 's' | 'm' | 'l' = 's';
  @Output() closeOut: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Toggle for close flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
    this.closeOut.emit(false);
  }
}
