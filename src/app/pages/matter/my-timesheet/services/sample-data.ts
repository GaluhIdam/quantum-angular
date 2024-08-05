import { Color } from '@quantum/fui';
import { DailyActivityDTO } from '../dtos/my-timesheet.dto';

export class SampleDataMyTimeSheet {

  /** YTD Productivity  */
  static readonly ytdProductivity: any[] = [
    {
      name: 'Billable',
      type: 'bar',
      stack: 'total',
      barWidth: '60%',
      label: {
        fontSize: 9,
        show: true,
        formatter: (params: any) => {
          const total =
            SampleDataMyTimeSheet.ytdProductivity[0].data[params.dataIndex] +
            SampleDataMyTimeSheet.ytdProductivity[1].data[params.dataIndex];
          const percentage = ((params.value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
      },
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
      barWidth: '60%',
      label: {
        fontSize: 9,
        show: true,
        formatter: (params: any) => {
          const total =
            SampleDataMyTimeSheet.ytdProductivity[0].data[params.dataIndex] +
            SampleDataMyTimeSheet.ytdProductivity[1].data[params.dataIndex];
          const percentage = ((params.value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [120, 132, 101, 134, 90, 230, 210, 320, 302, 301, 334, 390],
      showBackground: true,
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
