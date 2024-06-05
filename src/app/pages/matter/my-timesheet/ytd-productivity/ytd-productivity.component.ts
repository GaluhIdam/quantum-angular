import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EchartsComponent } from '@quantum/fui';

@Component({
  selector: 'app-ytd-productivity',
  standalone: true,
  imports: [CommonModule, EchartsComponent],
  templateUrl: './ytd-productivity.component.html',
  styleUrl: './ytd-productivity.component.scss',
})
export class YtdProductivityComponent {
  triggered: boolean = false;
  themeChart: 'light' | 'dark' = 'light';
  optionBar: any = {
    legend: {
      data: ['Billable', 'Non-Billable'],
      bottom: '0%',
      left: '0%',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '15%',
      left: '0%',
      right: '0%',
      bottom: '33%',
      containLabel: false,
    },
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
      axisLabel: {
        show: true,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Billable',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: [320, 302, 301, 334, 390, 330, 320, 120, 132, 101, 134, 90],
        showBackground: true,
      },
      {
        name: 'Non-Billable',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: [120, 132, 101, 134, 90, 230, 210, 320, 302, 301, 334, 390],
        showBackground: true,
      },
    ],
  };

}
