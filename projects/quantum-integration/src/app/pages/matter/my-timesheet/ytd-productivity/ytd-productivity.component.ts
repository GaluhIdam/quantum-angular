import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EchartsComponent, TextComponent } from '@quantum/fui';
import * as echarts from 'echarts/core';
import { ThemesChartCustom } from './theme-chart';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { SampleDataMyTimeSheet } from '../services/sample-data';
import { Subscription } from 'rxjs';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';

@Component({
  selector: 'app-ytd-productivity',
  standalone: true,
  imports: [
    CommonModule,
    EchartsComponent,
    EmptyDataComponent,
    SkeletonComponent,
    TextComponent,
  ],
  templateUrl: './ytd-productivity.component.html',
  styleUrl: './ytd-productivity.component.scss',
})
export class YtdProductivityComponent {
  loading: boolean = true;

  optionBar: any = {
    xAxis: {
      type: 'category',
      data: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      data: ['Billable Hours', 'Non-Billable'],
      top: 'bottom',
      bottom: '0%',
      left: '0%',
    },
    grid: {
      top: '15%',
      left: '0%',
      right: '0%',
      bottom: '33%',
      containLabel: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [],
  };

  constructor() {
    echarts.registerTheme('light', ThemesChartCustom.light);
    echarts.registerTheme('dark', ThemesChartCustom.dark);
  }

  private subscription!: Subscription;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
      this.optionBar.series = SampleDataMyTimeSheet.ytdProductivity;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
