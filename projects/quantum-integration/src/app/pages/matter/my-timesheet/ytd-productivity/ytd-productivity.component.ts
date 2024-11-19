import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { EchartsComponent, TextComponent } from '@quantum/fui';
import * as echarts from 'echarts/core';
import { ThemesChartCustom } from './theme-chart';
import { EmptyDataComponent } from '../../../../shared/empty-data/empty-data.component';
import { SkeletonComponent } from '../../../../shared/skeleton/skeleton.component';
import { YtdProductivityService } from '../../../../services/ytd-productivity/ytd-productivity.service';
import { ProductivityMonthlyDTO } from '../../../../interfaces/productivity-monthly.dto';

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
  @Input() type: 'month' | 'year' | 'appraisalYear' = 'year';

  /** Loading status */
  loading: boolean = true;

  /** Data ytd productivities */
  dataYtdProductivity: ProductivityMonthlyDTO[] = [];

  /** Series for billable */
  private seriesBillable: number[] = [];

  /** Series for non-billable */
  private seriesNonBillable: number[] = [];

  /** Echart Settings */
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
        data: this.seriesBillable,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'top',
          textBorderWidth: 0,
          formatter: (params: { data: number; dataIndex: number }) => {
            let percent = Math.round(
              (params.data /
                this.getTargetHour(
                  'billable',
                  this.dataYtdProductivity,
                  params.dataIndex
                )) *
                100
            );
            return percent + '%';
          },
        },
      },
      {
        name: 'Non-Billable',
        data: this.seriesNonBillable,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
        label: {
          show: true,
          position: 'top',
          textBorderWidth: 0,
          formatter: (params: { data: number; dataIndex: number }) => {
            let percent = Math.round(
              (params.data /
                this.getTargetHour(
                  'non-billable',
                  this.dataYtdProductivity,
                  params.dataIndex
                )) *
                100
            );
            console.log(params);
            return percent + '%';
          },
        },
      },
    ],
  };

  constructor(
    private readonly ytdProductivitiesService: YtdProductivityService
  ) {
    echarts.registerTheme('light', ThemesChartCustom.light);
    echarts.registerTheme('dark', ThemesChartCustom.dark);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      // this.getDataYtdProductivites(new Date().getFullYear(), this.type);
    }
  }

  /** Getting data productivities from service
   * @service
   *  YtdProductivityService
   */
  private getDataYtdProductivites(year: number, type: string): void {
    this.ytdProductivitiesService.getYtdProductivities(year, type).subscribe({
      next: (res) => {
        this.dataYtdProductivity = res;
        this.dataProcessingToArray(this.dataYtdProductivity);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /** Get data target hour for maximum value in chart */
  private getTargetHour(
    param: 'billable' | 'non-billable',
    data: ProductivityMonthlyDTO[],
    index: number
  ): number {
    if (param === 'billable') {
      return data[index].billableTargetHour;
    } else {
      return data[index].nonbillableTargetHour;
    }
  }

  /** Processing data to be number array */
  private dataProcessingToArray(data: ProductivityMonthlyDTO[]): void {
    if (data.length > 0) {
      data.forEach((item) => this.seriesBillable.push(item.billableActualHour));
      data.forEach((item) =>
        this.seriesNonBillable.push(item.nonbillableActualHour)
      );
    }
  }
}
