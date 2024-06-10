import { Color } from '@quantum/fui';
import { DailyActivityDTO } from '../dtos/my-timesheet.dto';

export class SampleDataMyTimeSheet {
  /** Productivity */
  static readonly productivity: number[] = [70, 90];

  /** YTD Productivity  */
  static readonly ytdProductivity: any[] = [
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
    {
      name: 'Untracked',
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series',
      },
      data: [],
      showBackground: false,
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
  static readonly history_activity: DailyActivityDTO[] = [
    {
      date: new Date('2024-05-20T07:05:59'),
      activityList: [
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Lecture',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5888,
          description: 'Lecture',
          duration: '30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5885,
          description: 'Experiment',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Experiment',
          duration: '1h',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5890,
          description: 'Experiment',
          duration: '30m',
          type: 'self',
        },
      ],
    },
    {
      date: new Date('2024-05-21T07:05:59'),
      activityList: [
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Lecture',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5888,
          description: 'Lecture',
          duration: '30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5885,
          description: 'Experiment',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Experiment',
          duration: '1h',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5890,
          description: 'Experiment',
          duration: '30m',
          type: 'self',
        },
      ],
    },
    {
      date: new Date('2024-05-22T07:05:59'),
      activityList: [
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Lecture',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5888,
          description: 'Lecture',
          duration: '30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5885,
          description: 'Experiment',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Experiment',
          duration: '1h',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5890,
          description: 'Experiment',
          duration: '30m',
          type: 'self',
        },
      ],
    },
    {
      date: new Date('2024-05-23T07:05:59'),
      activityList: [
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Lecture',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5888,
          description: 'Lecture',
          duration: '30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5885,
          description: 'Experiment',
          duration: '1h 30m',
          type: 'self',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5889,
          description: 'Experiment',
          duration: '1h',
          type: 'mention',
        },
        {
          date: new Date('2024-05-20T07:05:59'),
          matter: 5890,
          description: 'Experiment',
          duration: '30m',
          type: 'mention',
        },
      ],
    },
    {
      date: new Date('2024-05-24T07:05:59'),
      activityList: [],
    },
  ];

  // /** Productivity */
  // static readonly productivity: number[] = [];

  // /** YTD Productivity  */
  // static readonly ytdProductivity: any[] = [];

  // /** History Activity */
  // static readonly progress: {
  //   percentage: number;
  //   color: Color;
  // }[][] = [];
  // static readonly history_activity: DailyActivityDTO[] = [];
}
