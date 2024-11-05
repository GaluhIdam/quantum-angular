import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EchartsComponent, TextComponent } from '@quantum/fui';
import * as echarts from 'echarts/core';
import { ThemesChartCustom } from './theme-chart';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { YtdProductivityService } from '../../../../services/matter/my-timesheet/ytd-productivity/ytd-productivity.service';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { BaseController } from '../../../../core/controller/basecontroller';

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
export class YtdProductivityComponent extends BaseController {
  /** Call service */
  private readonly ytdProductivityService = inject(YtdProductivityService);

  /** Loading status */
  loading: boolean = true;

  maxValue: number = 200;

  /** Data Billable */
  dataBillable: number[] = [];

  /** Data Non-Billable */
  dataNonBillable: number[] = [];

  /** Current year */
  year: number = new Date().getFullYear();

  /** Option Chart */
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
    series: [
      {
        name: 'Billable Hours',
        data: this.dataBillable,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'top',
          textBorderWidth: 0,
          formatter: (params: { data: number }) => {
            let percent = Math.round((params.data / this.maxValue) * 100);
            return percent + '%';
          },
        },
      },
      {
        name: 'Non-Billable',
        data: this.dataNonBillable,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'top',
          textBorderWidth: 0,
          formatter: (params: { data: number }) => {
            let percent = Math.round((params.data / this.maxValue) * 100);
            return percent + '%';
          },
        },
      },
    ],
  };

  constructor() {
    super();
    echarts.registerTheme('light', ThemesChartCustom.light);
    echarts.registerTheme('dark', ThemesChartCustom.dark);
  }

  ngOnInit(): void {
    this.getYTDProductivityData(this.year);
  }

  /** Get data ytd productivity from service */
  getYTDProductivityData(year: number): void {
    this.ytdProductivityService.getYTDProductivity(year).subscribe({
      next: (value) => {
        this.dataBillable = value.result[0].data;
        this.dataNonBillable = value.result[1].data;
      },
      error: (error) => {
        this.errorToast(error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
