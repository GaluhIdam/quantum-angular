import { Color } from '@quantum/fui';

export class SampleDataMyTimeSheet {
  static maxValue = 200;

  static dataSeries1 = [
    110, 175, 140, 200, 95, 185, 130, 145, 180, 165, 120, 190,
  ];
  static dataSeries2 = [
    135, 155, 125, 180, 105, 160, 195, 140, 170, 115, 150, 185,
  ];

  /** YTD Productivity  */
  static readonly ytdProductivity: any[] = [
    {
      name: 'Billable Hours',
      data: this.dataSeries1,
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
      data: this.dataSeries2,
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
  ];

  /** History Activity */
  static readonly progress: {
    percentage: number;
    color: Color;
  }[][] = [
    [
      {
        percentage: 50,
        color: 'primary',
      },
      {
        percentage: 50,
        color: 'text',
      },
      {
        percentage: 0,
        color: 'warning',
      },
    ],
    [
      {
        percentage: 80,
        color: 'primary',
      },
      {
        percentage: 20,
        color: 'text',
      },
      {
        percentage: 0,
        color: 'warning',
      },
    ],
    [
      {
        percentage: 10,
        color: 'primary',
      },
      {
        percentage: 90,
        color: 'text',
      },
      {
        percentage: 0,
        color: 'warning',
      },
    ],
    [
      {
        percentage: 70,
        color: 'primary',
      },
      {
        percentage: 20,
        color: 'text',
      },
      {
        percentage: 10,
        color: 'warning',
      },
    ],
  ];
}
