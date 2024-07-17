import { Component } from '@angular/core';
import {
  ButtonIconComponent,
  ComboBoxComponent,
  DateRangeComponent,
  FlyoutBodyComponent,
  FlyoutComponent,
  FlyoutFooterComponent,
  FlyoutHeaderComponent,
  FormControlLayoutComponent,
  IconsComponent,
  InputFieldComponent,
} from '@quantum/fui';

@Component({
  selector: 'app-search-filter-add',
  standalone: true,
  imports: [
    FormControlLayoutComponent,
    InputFieldComponent,
    IconsComponent,
    ButtonIconComponent,
    ComboBoxComponent,
    DateRangeComponent,
    FlyoutBodyComponent,
    FlyoutComponent,
    FlyoutFooterComponent,
    FlyoutHeaderComponent,
  ],
  templateUrl: './search-filter-add.component.html',
  styleUrl: './search-filter-add.component.scss',
})
export class SearchFilterAddComponent {
  isOpenFlyout: boolean = false;

  /** Open Flyout */
  toggleOpenFlyout(): void {
    this.isOpenFlyout = true;
  }

  /** Close Flyout */
  toggleCloseFlyout(): void {
    this.isOpenFlyout = false;
  }
}
