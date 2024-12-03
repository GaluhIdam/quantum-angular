import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonIconComponent,
  CollapsibleNavGroupComponent,
  Icon,
  TableBodyComponent,
  TableBodyDataComponent,
  TableBodyRowComponent,
  TableComponent,
  TextComponent,
} from '@quantum/fui';
import { FlyoutSpecialRatesComponent } from '../../flyout-shared/flyout-special-rates/flyout-special-rates.component';

@Component({
  selector: 'app-special-rates',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextComponent,
    ButtonIconComponent,
    TableComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyDataComponent,
    CollapsibleNavGroupComponent,
    FlyoutSpecialRatesComponent,
  ],
  templateUrl: './special-rates.component.html',
  styleUrl: './special-rates.component.scss',
})
export class SpecialRatesComponent {
  isCollapsed: boolean = false;
  titleFlyout: string = '';
  dataSpecialRate: {
    member: string;
    position: string;
    rates: { rate: number; start: string; end: string }[];
  }[] = [
    {
      member: 'Jane Cooper (JC)',
      position: 'Senior Associates',
      rates: [
        {
          rate: 300,
          start: '1 Feb, 2024',
          end: '28 Feb, 2024',
        },
        {
          rate: 250,
          start: '1 Jan, 2024',
          end: '31 Jan, 2024',
        },
      ],
    },
  ];

  /** Currency Form */
  currencyForm: FormControl = new FormControl('USD');
  currencyOption: { label: string; value: string }[] = [
    {
      label: 'IDR',
      value: 'IDR',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
  ];

  isFlyoutSpecialRates: boolean = false;
  isMatterMemberForm: boolean = false;

  /** Get max/min rate */
  getMinMaxRates() {
    const allRates = this.dataSpecialRate.flatMap((entry) =>
      entry.rates.map((rate) => rate.rate)
    );
    const minRate = Math.min(...allRates);
    const maxRate = Math.max(...allRates);

    return { minRate, maxRate };
  }

  /** Show/Hide Table */
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /** Open or Close Flyout Special Rates */
  openCloseFlyout(title: string): void {
    if (title === 'Add Sepcial Rates') {
      this.isMatterMemberForm = true;
    } else {
      this.isMatterMemberForm = false;
    }
    this.isFlyoutSpecialRates = !this.isFlyoutSpecialRates;
    this.titleFlyout = title;
  }
}
